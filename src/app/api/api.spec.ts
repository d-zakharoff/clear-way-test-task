import { TestBed } from '@angular/core/testing';

import { Api } from './api';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Api', () => {
  let service: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(Api);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
