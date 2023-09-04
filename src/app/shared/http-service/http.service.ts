import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment.development';
import { AnnotationApiResponse, SuccessAnnotationResponse } from '../interfaces/annotation.interface';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getImage(): Observable<string> {
    const size = '512x512/101010';
    return this.http.get<Blob>(`${env.imageApiBaseUrl}${size}`, { responseType: 'blob' as 'json' }).pipe(
      switchMap((blob) => {
        return new Observable<string>((observer) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                observer.next(reader.result as string);
                observer.complete();
            };
            reader.onerror = (error) => {
                observer.error(error);
            };
            reader.readAsDataURL(blob);
        });
    })
    );
  }

  getAnnotations(): Observable<SuccessAnnotationResponse> {
    const status = 200;
    const dummyAnnotations = '[{"id":"a1","radiusX":20,"radiusY":25,"x":50,"y":60}]';
    return this.http.get<AnnotationApiResponse>(`${env.annotationsApiBaseUrl}${status}/${dummyAnnotations}`)
    .pipe(map(data => ({...data, message: JSON.parse(data.message)})));
  }
}
