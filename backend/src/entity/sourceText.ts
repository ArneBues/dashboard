import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SourceText {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  language!: string;

  @Column()
  contentType!: string;

  @Column('text')
  content!: string;
  /**
  @ManyToOne((type) => Source)
  source!: Source;*/
}
