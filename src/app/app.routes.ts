import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'document',
    loadChildren: () => import('./documents/documents.routes').then((mod) => mod.documentsRoutes),
  },
  { path: '**', redirectTo: 'document/1', pathMatch: 'full' },
];
