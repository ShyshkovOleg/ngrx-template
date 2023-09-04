import { createAction, createActionGroup, props } from '@ngrx/store';
import { ErrorAnnotationResponse, SuccessAnnotationResponse } from 'src/app/shared/interfaces/annotation.interface';

export const AnnotationsActions = createActionGroup({
  source: 'Annotations',
  events: {
    'Load Annotations Success': props<{ data: SuccessAnnotationResponse }>(),
    'Load Annotations Failure': props<{ error: ErrorAnnotationResponse }>(),
  }
});

export const ImageActions = createActionGroup({
  source: 'Annotations',
  events: {
    'Load Image Success': props<{ data: string }>(),
    'Load Image Failure': props<{ error: unknown }>(),
  }
});

export const DrawImageAndAnnotationsButtonClicked = createAction(
  'Draw Image and Annotations Button Clicked'
);
