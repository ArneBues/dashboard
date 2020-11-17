// eslint-disable-next-line import/no-cycle
import { Source } from './source';

export interface Fachbereich {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface PublisherStructure {
  id: number;
  name: string;
  website: string;
  description: string;
  good?: number;
  bad?: number;
  sources?: Source[];
  fachbereich?: number[];
  category: Category;
  indexed?: boolean;
}
