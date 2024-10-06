import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {AuthConfig, OAuthService, provideOAuthClient} from 'angular-oauth2-oidc';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

import {ErrorInterceptor, LoggerInterceptor, uiLoaderInterceptor} from './shared/index';
import {MatDialogModule} from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Providers - Ngrx
import {appEffects, appStore} from './shared/store/store';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {createDevToolsConfig} from './shared/store/config/dev-tools.config';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/dev-test-realm',
  tokenEndpoint: 'http://localhost:8180/realms/dev-test-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'my-webapp-client',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  });
}

/** Provider for the Noop Interceptor. */
export const errorInterceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // or true
      }),
    ),
    provideAnimations(),
    importProvidersFrom([HttpClientModule, MatDialogModule, NgbModule]),
    errorInterceptor,
    provideHttpClient(withInterceptors([LoggerInterceptor, uiLoaderInterceptor])),
    provideStore(appStore, {runtimeChecks: {}}),
    // provideStore(appStore, { runtimeChecks: {}, metaReducers: metaReducers }),
    provideEffects(appEffects),
    provideStoreDevtools(createDevToolsConfig()),

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // },
    // TODO: Enable OAuthClient
    // provideOAuthClient(),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (oauthService: OAuthService) => {
    //     return () => {
    //       initializeOAuth(oauthService);
    //     }
    //   },
    //   multi: true,
    //   deps: [
    //     OAuthService
    //   ]
    // }
  ],
};
