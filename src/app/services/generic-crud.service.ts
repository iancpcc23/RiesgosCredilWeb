import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandler } from '../models/handle-error';

@Injectable({
  providedIn: 'root',
})
export class GenericCRUDService {
  constructor(private httpClient: HttpClient) {}

  getApiData<T>(apiUrl: string): Observable<any> {
    return this.httpClient
      .get<T>(apiUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }
  postApiData<T>(
    apiUrl: string,
    data: string | object | null
  ): Observable<any> {
    return this.httpClient
      .post<T>(apiUrl, data)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(err: HttpErrorResponse) {
    // debugger;
    let message: ErrorHandler;
    if (err.error instanceof ErrorEvent) {
      message = { code: err.status, message: err.message };
    } else {
      if (err.status === 0) {
        message = {
          code: err.status,
          messageDeveloper: err.message,
          message: 'No se pudo conectar con el servidor',
        };
      } else {
        message = {
          code: err.status,
          messageDeveloper: err.error.message,
          message: err.error.error,
        };
      }
    }

    return throwError(() => message);
  }
}
