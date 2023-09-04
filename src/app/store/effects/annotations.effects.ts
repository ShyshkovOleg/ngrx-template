import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../../shared/http-service/http.service';
import {
  DrawImageAndAnnotationsButtonClicked,
  ImageActions,
  AnnotationsActions
} from '../actions/annotations.actions';
import { SuccessAnnotationResponse } from 'src/app/shared/interfaces/annotation.interface';

@Injectable()
export class AnnotationsEffects {

  constructor(
    private actions$: Actions,
    private http: HttpService
  ) {}

  loadImageAndAnnotations$ = createEffect(() => this.actions$.pipe(
    ofType(DrawImageAndAnnotationsButtonClicked),
    mergeMap(() => merge(
      this.http.getImage().pipe(
        map((data: string) => ImageActions.loadImageSuccess({ data })),
        catchError((error: unknown) => of(ImageActions.loadImageFailure({ error })))
      ),
      this.http.getAnnotations().pipe(
        map((data: SuccessAnnotationResponse) => AnnotationsActions.loadAnnotationsSuccess({ data })),
        catchError(error => of(AnnotationsActions.loadAnnotationsFailure({ error })))
      )
    ))
  ));

}

