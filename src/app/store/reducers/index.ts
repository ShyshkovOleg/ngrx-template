import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAnnotationReducer from './annotations-reducer/annotation.reducer';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}


export interface AppState {
  [fromAnnotationReducer.annotationFeatureKey]: fromAnnotationReducer.AnnotationState
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAnnotationReducer.annotationFeatureKey]: fromAnnotationReducer.reducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [debug] : [];
