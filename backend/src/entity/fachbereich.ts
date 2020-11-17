import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Publisher } from './publisher';
import { Source } from './source';

@Entity()
export class Fachbereich {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany((type) => Publisher, (publisher) => publisher.fachbereich, {})
  publisher!: Source[];
}
