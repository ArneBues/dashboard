import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  text!: string;

  @Column()
  date!: Date;

  @ManyToOne((type) => User, { eager: true })
  writer!: User;
}
