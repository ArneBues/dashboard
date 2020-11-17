import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { TestCase } from '../entity/testcase';
import { TestGroup } from '../entity/testGroup';
import { Error } from '../error';
import { TestGroupRepository } from './testGroupRepository';

@EntityRepository(TestCase)
export class TestCaseRepository extends Repository<TestCase> {
  private testGroupRepository = getCustomRepository(TestGroupRepository);

  async createAndSave(body: any, file: any) {
    const testCase = new TestCase();
    return this.write(testCase, body, file);
  }

  async updateTestCase(id: string, body: any, file: any): Promise<TestCase> {
    const testCase = await this.findOne(id);

    if (testCase === undefined) {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    }

    console.log(file);

    return this.write(testCase, body, file);
  }

  private write(testCase: TestCase, body: any, file: any) {
    console.log(body);
    console.log(file);
    testCase.name = body.name;
    testCase.description = body.description;
    testCase.successPercent = Number(body.successPercent);
    testCase.manuell = body.manuell === 'true';
    if (file !== undefined) {
      testCase.file = file.buffer;
      testCase.filename = file.originalname;
    }

    return this.save(testCase);
  }

  async deleteTestCase(id: string) {
    const entity = await this.findOne(id);

    if (typeof entity === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      entity.testGroup = null;
      return this.remove(entity);
    }
  }

  async findById(id: string | number) {
    const entity = await this.findOne(id);

    if (typeof entity === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return entity;
    }
  }

  async addToGroup(
    id: string | number,
    testGroup: TestGroup,
  ): Promise<TestCase | unknown>;
  async addToGroup(
    id: string | number,
    testGroupID: number | string,
  ): Promise<TestCase | unknown>;
  async addToGroup(
    id: string | number,
    testGroup: TestGroup | number | string,
  ): Promise<TestCase | unknown> {
    if (typeof testGroup === 'number' || typeof testGroup === 'string') {
      try {
        testGroup = await this.testGroupRepository.findById(testGroup);
      } catch (e) {
        return Promise.reject('Test Group not found');
      }
    }

    try {
      const testCase = await this.findById(id);
      testCase.testGroup = testGroup;
      this.save(testCase);
    } catch (error) {
      return Promise.reject('Test not found');
    }
  }

  async findByGroupId(group: string | number) {
    if (group === 'null')
      return this.find({ where: { testGroup: null, manuell: false } });
    return this.find({ where: { testGroup: group, manuell: false } });
  }
}
