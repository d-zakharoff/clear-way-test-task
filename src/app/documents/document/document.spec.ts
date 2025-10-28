import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Document } from './document';
import { inputBinding, provideZonelessChangeDetection } from '@angular/core';

describe('Document', () => {
  let component: Document;
  let fixture: ComponentFixture<Document>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Document],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Document, {
      bindings: [inputBinding('document', () => ({}))],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
