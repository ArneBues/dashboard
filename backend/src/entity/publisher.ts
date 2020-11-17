import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fachbereich } from './fachbereich';
import { PublisherCategory } from './publisherCategory';
import { Source } from './source';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  website!: string;

  @Column({ type: 'text' })
  description!: string;

  @OneToMany((type) => Source, (source) => source.publisher, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  source!: Source[];

  @ManyToMany((type) => Fachbereich, (fachbereich) => fachbereich.publisher, {
    eager: true,
  })
  @JoinTable()
  fachbereich!: Fachbereich[];

  @Column({
    default: true,
  })
  indexed!: boolean;

  @ManyToOne((type) => PublisherCategory, { eager: true })
  category!: PublisherCategory;

  percentageIndexed!: number;
}
