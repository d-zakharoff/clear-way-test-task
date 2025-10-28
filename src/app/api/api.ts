import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDto } from './models/document.dto';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private httpClient: HttpClient = inject(HttpClient);

  public getDocument(id: string): Observable<DocumentDto> {
    return this.httpClient.get<DocumentDto>(`documents/1/1.json`);
  }

  public getDocumentPage(number: number): Observable<DocumentDto> {
    return this.httpClient.get<DocumentDto>(`documents/1/pages/${number}.png`);
  }
}
