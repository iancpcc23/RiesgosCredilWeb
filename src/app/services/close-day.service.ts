import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.interface';
import { GenericCRUDService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class CloseDayService {
  private readonly base_url = `${environment.url_services}/LAyRLM/copyInformation`;
  private readonly headers = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    withCredentials: true,
  };

  constructor(private _genericCRUDService:GenericCRUDService) {}

  runSP$ = (date: string): Observable<IResponse> => {
    return this._genericCRUDService.postApiData<IResponse>(
      `${this.base_url}?date=${date}`,
      null
    )

  };
}
