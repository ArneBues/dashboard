import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './test';
import { TestGroup } from './testGroup';

@Entity()
export class TestGroupResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => TestGroup)
  testGroup!: TestGroup;

  @Column()
  date!: Date;

  @OneToMany((type) => Test, (test) => test.testGroupResult, {
    cascade: true,
  })
  tests!: Test[];

  success!: number;
  failure!: number;
}
