import {
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
  } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { Observable } from 'rxjs';
  import { finalize } from 'rxjs';
  
  import { IS_UI_LOADING } from '../tokens/is-loading-token';
  
  export const uiLoaderInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ): Observable<HttpEvent<unknown>> => {
    const uiObserverSubject$ = inject(IS_UI_LOADING);
  
    uiObserverSubject$.next(true);
  
    return next(req).pipe(
      finalize(() => {
        uiObserverSubject$.next(false);
      }),
    );
  };
  