import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {BackendDownComponent} from '../../pages/backend-down/backend-down.component';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // tap((req) => console.log("my req", req)),
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 600) {
          this.openErrorDialog(`Error ${error.status}: ${error.message}`);
        } else if (error.status === 0) {
          this.openErrorDialog('Backend is down. Please try again later.');
        }
        return throwError(() => error);
      }),
    );
  }

  private openErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(BackendDownComponent, {
      width: '300px',
      data: {errorMessage: message},
    });

    // Optional: Handle any actions after the dialog is closed
    dialogRef.afterClosed().subscribe(() => {
      console.log('The error dialog was closed');
    });
  }
}
