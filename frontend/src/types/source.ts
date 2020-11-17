// eslint-disable-next-line import/no-cycle
import { PublisherStructure } from './publisher';

export interface Source {
  id: number;
  name: string;
  indexed: boolean;
  publisher: PublisherStructure;
  date: string;
}
