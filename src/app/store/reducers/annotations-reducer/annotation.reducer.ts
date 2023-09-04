import { Action, createReducer, on } from '@ngrx/store';
import { Annotation, ErrorAnnotationResponse } from "../../../shared/interfaces/annotation.interface";
import { AnnotationsActions, ImageActions } from '../../actions/annotations.actions';
import { state } from '@angular/animations';

export const annotationFeatureKey = 'annotationSlice';

export interface AnnotationState {
  annotations: Annotation[],
  image: string | null;
  error: ErrorAnnotationResponse | null | unknown;
}

export const initialState: AnnotationState = {
  annotations: [],
  image: null,
  error: null
};

export const annotationsReducer = createReducer(
  initialState,

  on(AnnotationsActions.loadAnnotationsSuccess, (state, {data}) => ({
       ...state,
      annotations: [...state.annotations, ...data.message],
      error: null
  })
  ),

  on(AnnotationsActions.loadAnnotationsFailure, (state, { error }) => ({
    ...state,
    annotations: [],
    error
  })),

  on(ImageActions.loadImageSuccess, (state, { data }) => ({
      ...state,
      image: data as string,
      error: null
    })
  ),

  on(ImageActions.loadImageFailure, (state, { error }) => ({
    ...state,
    image: null,
    error
  }))
);

export function reducer(state: AnnotationState | undefined, action: Action) {
  return annotationsReducer(state, action);
}

