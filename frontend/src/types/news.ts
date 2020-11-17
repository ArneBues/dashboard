import { User } from './user';

export interface News {
  id: number;
  title: string;
  text: string;
  date: Date;
  writer?: User;
}
