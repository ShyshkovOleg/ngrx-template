import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DrawImageAndAnnotationsButtonClicked } from './store/actions/annotations.actions';
import { Annotation, AppState } from './shared/interfaces/annotation.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  image$!: Observable<string | null>;
  annotations$!: Observable<Annotation[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.image$ = this.store.select((state: AppState) => state.annotationSlice!.image);
    this.annotations$ = this.store.select((state: AppState) => state.annotationSlice!.annotations);
  }

  loadImageAndAnnotations(): void {
    this.store.dispatch(DrawImageAndAnnotationsButtonClicked());
  }
}
