import {
  Component,
  ElementRef,
  HostListener,
  inject,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-annotation',
  imports: [CommonModule, MatIconButton, MatIcon, MatInput, FormsModule],
  templateUrl: './annotation.html',
  styleUrl: './annotation.scss',
  host: {
    '[draggable]': 'true',
  },
})
export class Annotation {
  public readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  public readonly delete: OutputEmitterRef<void> = output<void>();
  public text: ModelSignal<string> = model.required();

  @HostListener('dragstart', ['$event'])
  public onDragStart(event: DragEvent) {
    if (event.dataTransfer && event.target instanceof HTMLElement) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData('text/plain', event.target.id);
      event.target.setAttribute(
        'offsetX',
        String(event.clientX - event.target.getBoundingClientRect().left),
      );
      event.target.setAttribute(
        'offsetY',
        String(event.clientY - event.target.getBoundingClientRect().top),
      );
    }
  }
}
