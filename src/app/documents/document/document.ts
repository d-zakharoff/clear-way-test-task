import {
  Component,
  ComponentRef,
  computed,
  ElementRef,
  input,
  inputBinding,
  InputSignal,
  outputBinding,
  Signal,
  signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { DocumentDto } from '../../api/models/document.dto';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { Annotation } from '../annotation/annotation';
import { AnnotationDto } from '../../api/models/annotation.dto';

@Component({
  selector: 'app-document',
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDivider,
  ],
  templateUrl: './document.html',
  styleUrl: './document.scss',
})
export class Document {
  @ViewChild('annotationsHost', { read: ViewContainerRef })
  public annotationsHost: ViewContainerRef | undefined;
  @ViewChild('documentViewport')
  public documentViewport: ElementRef<HTMLElement> | undefined;
  @ViewChild('documentContainer')
  public documentContainer: ElementRef<HTMLElement> | undefined;
  public annotations: ComponentRef<Annotation>[] = [];

  protected document: InputSignal<DocumentDto> = input.required<DocumentDto>();
  protected scale: WritableSignal<number> = signal(1);
  protected scalePercent: Signal<string> = computed(() => (this.scale() * 100).toFixed(2));

  public onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.target instanceof HTMLElement) {
      const annotationElement = document.getElementById(event.dataTransfer.getData('text/plain'));
      if (annotationElement) {
        if (!annotationElement.contains(event.target)) {
          annotationElement.style.left = `${event.offsetX - Number(annotationElement.getAttribute('offsetX'))}px`;
          annotationElement.style.top = `${event.offsetY - Number(annotationElement.getAttribute('offsetY'))}px`;
        }
      }
    }
  }

  public addAnnotation(): void {
    if (this.annotationsHost) {
      const newAnnotationIndex = this.annotationsHost!.length;
      const annotation = this.annotationsHost.createComponent(Annotation, {
        bindings: [
          inputBinding('text', () => `Annotation ${newAnnotationIndex + 1}`),
          outputBinding<void>('delete', (): void => {
            const annotationIndex = this.annotationsHost!.indexOf(annotation.hostView);
            if (annotationIndex !== -1) {
              this.annotationsHost!.remove(annotationIndex);
              this.annotations.splice(annotationIndex, 1);
            }
          }),
        ],
      });
      annotation.location.nativeElement.id = `annotation${newAnnotationIndex}`;
      annotation.location.nativeElement.style.left = `${(this.documentContainer?.nativeElement.getBoundingClientRect().width || 0) / 2}px`;
      annotation.location.nativeElement.style.top = `${(this.documentViewport?.nativeElement.scrollTop || 0) + 300}px`;
      this.annotations.push(annotation);
    }
  }

  public zoomIn(): void {
    this.scale.update((scale) => Math.min(scale + 0.1, 4));
  }

  public zoomOut(): void {
    this.scale.update((scale) => Math.max(scale - 0.1, 0.1));
  }

  public save(): void {
    console.log({
      ...this.document(),
      annotations: this.annotations?.map(
        (a) =>
          ({
            text: a.instance.text(),
            x: a.instance.element.nativeElement.offsetTop || 0,
            y: a.instance.element.nativeElement.offsetLeft || 0,
          }) as AnnotationDto,
      ),
    });
  }
}
