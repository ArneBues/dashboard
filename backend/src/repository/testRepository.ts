import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Test } from '../entity/test';
import { TestCase } from '../entity/testcase';
import { TestGroupResult } from '../entity/testGroupResult';
import { Error } from '../error';
import { TestGroupRepository } from './testGroupRepository';

@EntityRepository(Test)
export class TestRepository extends Repository<Test> {
  private testGroupRepository = getCustomRepository(TestGroupRepository);

  async findById(id: string | number) {
    const source = await this.findOne(id, { relations: ['testCase'] });

    if (typeof source === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return source;
    }
  }

  async findByTestCaseID(testCaseId: string | number, limit?: string) {
    let tests: Promise<Test[]>;
    if (limit) {
      tests = this.find({
        where: { testCase: testCaseId },
        order: { date: 'DESC' },
        take: Number(limit),
      });
    } else {
      tests = this.find({
        where: { testCase: testCaseId },
        order: { date: 'DESC' },
      });
    }

    return tests;
  }

  async createTest(testCase: TestCase, testGroupResult?: TestGroupResult) {
    const test = new Test();
    test.date = new Date();
    test.testCase = testCase;
    if (testGroupResult !== undefined) {
      test.testGroupResult = testGroupResult;
    }
    return this.save(test);
  }

  async deleteTest(test: number | string | Test) {
    if (typeof test === 'string' || typeof test === 'number') {
      test = await this.findById(test);
    }
    test.testGroupResult = null;
    return this.remove(test);
  }
}
