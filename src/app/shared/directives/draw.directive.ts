import { Directive, ElementRef, Input } from '@angular/core';
import { Annotation } from '../interfaces/annotation.interface';

@Directive({
  selector: '[appDraw]'
})
export class DrawDirective {
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D | null;

  @Input()
  set appDraw(annotations: Annotation[] | null) {
    this.canvas = this.el.nativeElement;
    this.context = this.canvas.getContext('2d');
    if(annotations?.length) {
      this.drawEllipse(annotations[0], this.context!);
    }
  }

  constructor(private el: ElementRef) {}

  drawEllipse(ellipseData: Annotation, canvasContext: CanvasRenderingContext2D): void {
    canvasContext.beginPath();
    canvasContext.ellipse(ellipseData.x, ellipseData.y, ellipseData.radiusX, ellipseData.radiusY, 0, 0, 2 * Math.PI);
    canvasContext.stroke();
  }

}
