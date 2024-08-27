import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';



export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            console.log("ERROR CAPTURE::", error)
            if (error.status >= 400 && error.status < 600) {
              // Redirect to the global error page
              router.navigate(['/error']);
            } else if (error.status == 0) {
              // Redirect to the global error page
              router.navigate(['/backendDown']);
            }
            return throwError(() => error);
          })
    )
  }

 