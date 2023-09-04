export interface Annotation {
  "id": string,
  "x": number,
  "y": number,
  "radiusX": number,
  "radiusY": number,
}

export interface AnnotationApiResponse {
  status: string,
  message: string
};

export interface SuccessAnnotationResponse {
  status: string;
  message: Annotation[];
}

export interface ErrorAnnotationResponse {
  status: string;
  title: Annotation[];
  type: string;
  detail: Annotation[];
}

export interface AppState {
  annotationSlice?: {
    annotations: Annotation[],
    image: string | null;
    error: ErrorAnnotationResponse | null | unknown;
  }
}
