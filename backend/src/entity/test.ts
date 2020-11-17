import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestCase } from './testcase';
import { TestGroupResult } from './testGroupResult';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  percentage!: number;

  @Column({ type: 'text', nullable: true })
  email!: string;

  @Column()
  date!: Date;

  @ManyToOne((type) => TestCase, { nullable: true, onDelete: 'CASCADE' })
  testCase!: TestCase;

  @ManyToOne((type) => TestGroupResult, { nullable: true, onDelete: 'CASCADE' })
  testGroupResult!: TestGroupResult | null;
}
