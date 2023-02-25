import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
  tap,
} from 'rxjs';
import { AppState } from 'src/app/models/app-state.interface';
import { DataState } from 'src/app/models/data-state.enum';
import { IResponse } from 'src/app/models/response.interface';
import { IUser } from 'src/app/models/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this._formBuilder.nonNullable.group({
    usuario: ['CHASICHRISTIAN', Validators.required],
    password: ['1234567', Validators.required],
  });

  login$!: Observable<AppState<IResponse>>;
  readonly DataState = DataState;


  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _localStorage: StorageService
  ) {}

  async onSubmit() {
    const user: IUser = this.loginForm.value;

    this.login$ = this._authService.login$(user).pipe(
      tap((response: any) => {
        this.router.navigateByUrl('/home');
        const { accessToken } = response?.data;
        this._localStorage.saveData('token', accessToken);
      }),

      map((response) => {
        return { state: DataState.LOADED, data: response };
      }),

      startWith({ state: DataState.LOADING }),
      catchError((error ) => {
         console.log('Error', error);
        return of({ state: DataState.ERROR, data: error });
      })
    );

    //   {
    //   next:(value)=>{
    //     console.log('response', value);
    //   },
    //   error:(error)=>{
    //     console.log('Error', error);
    //   }
    //  });
  }
}
