import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { DocumentDto } from '../../api/models/document.dto';
import { Api } from '../../api/api';

export const documentResolver: ResolveFn<DocumentDto> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const api = inject(Api);
  const documentId = route.paramMap.get('id')!;
  return api.getDocument(documentId);
};
