import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Publisher } from './publisher';

@Entity()
export class PublisherCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany((type) => Publisher, (publisher) => publisher.category)
  publisher!: Publisher[];
}
