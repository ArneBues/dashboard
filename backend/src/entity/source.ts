import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Publisher } from './publisher';

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne((type) => Publisher)
  publisher!: Publisher;

  @Column()
  date!: Date;

  @Column()
  indexed!: boolean;
}
