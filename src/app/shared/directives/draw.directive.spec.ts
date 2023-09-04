import { ElementRef } from '@angular/core';
import { DrawDirective } from './draw.directive';

describe('DrawDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('canvas'));
    const directive = new DrawDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
