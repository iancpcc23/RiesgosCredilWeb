import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  catchError,
  interval,
  map,
  Observable,
  of,
  startWith,
  tap,
  timeInterval,
  timer,
} from 'rxjs';
import { AppState } from 'src/app/models/app-state.interface';
import { DataState } from 'src/app/models/data-state.enum';
import { IResponse } from 'src/app/models/response.interface';
import { CloseDayService } from 'src/app/services/close-day.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  runSP$!: Observable<AppState<IResponse>>;
  controlDate = new FormControl('');
  readonly DataState = DataState;
  tiempo = interval(1000);
  timeValues: number = 0;
  appState!: AppState<IResponse>;

  constructor(private closeService: CloseDayService) {}

  onSubmit(): void {
    if (this.controlDate.value === '') {
      return this.controlDate.setErrors({ fecha: 'Escoja una fecha correcta' });
    }
    this.timeValues = 0;
    // let tiempo$ = this.tiempo.subscribe(val=>{
    //   console.log('Tiempo transcurrido', val);
    this.closeService
      .runSP$(this.controlDate.value!)
      .pipe(
        map((res) => {
          return { state: DataState.LOADED, data: res };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {
          console.log('Error,', error);
          return of({ state: DataState.ERROR, data: error });
        })
      )
      .subscribe((response) => (this.appState = response));
    // }) ;

    // tiempo$?.unsubscribe()
  }
}
