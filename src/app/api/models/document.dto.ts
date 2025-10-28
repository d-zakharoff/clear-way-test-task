import { DocumentPageDto } from './document-page.dto';
import { AnnotationDto } from './annotation.dto';

export interface DocumentDto {
  name: string;
  pages: DocumentPageDto[];
  annotations?: AnnotationDto[];
}
