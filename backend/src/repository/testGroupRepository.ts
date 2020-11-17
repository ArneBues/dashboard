import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { TestGroup } from '../entity/testGroup';
import { Error } from '../error';
import { TestGroupResultRepository } from './testGroupResult';

@EntityRepository(TestGroup)
export class TestGroupRepository extends Repository<TestGroup> {
  private testResult = getCustomRepository(TestGroupResultRepository);

  async findById(id: string | number) {
    const source = await this.findOne(id, { relations: ['testCases', 'testResult'] });

    if (typeof source === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return source;
    }
  }

  async createAndSave(body: any) {
    const testGroup = new TestGroup();
    return this.write(testGroup, body);
  }

  async updateTestGroup(id: string, body: any): Promise<TestGroup> {
    const testGroup = await this.findById(id);

    return this.write(testGroup, body);
  }

  async write(testGroup: TestGroup, body: any) {
    testGroup.name = body.name;
    testGroup.description = body.description;
    testGroup.date = body.date;
    testGroup.interval = Number(body.interval);
    try {
      testGroup.testCases = [];
      if (body.testCases !== undefined && body.testCases.length > 0) {
        body.testCases.forEach((testcase: any) => {
          testGroup.testCases.push(<any>{ id: Number(testcase.id) });
          console.log('yo');
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(testGroup);
    return this.save(testGroup);
  }

  async deleteTestGroup(id: string) {
    try {
      const entity = await this.findById(id);

      entity.testCases = [];
      let results = entity.testResult;
      entity.testResult = [];
      this.testResult.remove(results);
      await this.save(entity);
      return this.remove(entity);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findByTestID(testId: string | number) {
    const tests = this.find({ where: { tests: testId } });

    return tests;
  }

  private buildTestGroupRelation() {
    const query = this.createQueryBuilder('group')
      .leftJoinAndSelect('group.testResult', 'testResult')
      .leftJoinAndSelect('testResult.tests', 'test')
      .leftJoinAndSelect('test.testCase', 'testCase');
    return query;
  }

  async getTestGroupOne(id: string | number) {
    if (typeof id === 'string') id = Number(id);
    return this.buildTestGroupRelation()
      .addSelect('COUNT(testResult.id) as count')
      .orderBy('group.lastTest', 'DESC')
      .groupBy('testResult.id')
      .where('group.id=:id', { id })
      .getOne();
  }
}
