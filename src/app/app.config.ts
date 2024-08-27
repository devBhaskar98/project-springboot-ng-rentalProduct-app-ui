import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './service/interceptors/error.interceptor';
import { LoggerInterceptor } from './service/interceptors/logger.interceptor';


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
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([LoggerInterceptor, ErrorInterceptor])),
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
  ]
};
