import { Routes } from '@angular/router';
import { Document } from './document/document';
import { documentResolver } from './document/document.resolver';

export const documentsRoutes: Routes = [
  { path: ':id', component: Document, resolve: { document: documentResolver } },
];
