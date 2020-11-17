import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestCase } from './testcase';
import { TestGroupResult } from './testGroupResult';

@Entity()
export class TestGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  date!: Date;

  @OneToMany((type) => TestCase, (testCase) => testCase.testGroup, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  testCases!: TestCase[];

  @OneToMany((type) => TestGroupResult, (testResult) => testResult.testGroup, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  testResult!: TestGroupResult[];

  @Column()
  interval!: number;

  @Column({ nullable: true })
  lastTest!: Date;
}
