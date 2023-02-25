import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/usuario.interface';
import { catchError, Observable } from 'rxjs';
import { IResponse } from '../models/response.interface';
import { GenericCRUDService } from './generic-crud.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly base_url =  `${environment.url_services}/Auth`
  private readonly headers = {headers: new HttpHeaders().set('Content-type', 'application/json'), withCredentials: true};

  constructor(private _genericCRUDService:GenericCRUDService) { }


   login$ =  (user: IUser):Observable< IResponse> => {
   return  this._genericCRUDService.postApiData<IResponse>(`${this.base_url}/login`, user)
  }


}
