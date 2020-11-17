import { Column, Entity, getManager, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestGroup } from './testGroup';

@Entity()
export class TestCase {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'longblob',
    nullable: true,
    select: false,
  })
  file?: Buffer;

  @Column()
  filename!: string;

  @Column('float')
  successPercent!: number;

  @Column()
  manuell!: boolean;

  @ManyToOne((type) => TestGroup, { nullable: true })
  testGroup!: TestGroup | null;
}
