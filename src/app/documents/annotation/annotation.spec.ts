import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Annotation } from './annotation';
import { inputBinding, provideZonelessChangeDetection } from '@angular/core';

describe('Annotation', () => {
  let component: Annotation;
  let fixture: ComponentFixture<Annotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Annotation],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Annotation, {
      bindings: [inputBinding('text', () => `test`)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
