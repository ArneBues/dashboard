import { EntityRepository, Repository } from 'typeorm';
import { TestGroup } from '../entity/testGroup';
import { TestGroupResult } from '../entity/testGroupResult';
import { Error } from '../error';

@EntityRepository(TestGroupResult)
export class TestGroupResultRepository extends Repository<TestGroupResult> {
  async new(testGroup: TestGroup) {
    const result = new TestGroupResult();
    result.testGroup = testGroup;
    result.date = new Date();
    return this.save(result);
  }

  private getJoin() {
    const query = this.createQueryBuilder('testResult')
      .leftJoinAndSelect('testResult.tests', 'test')
      .leftJoinAndSelect('test.testCase', 'testCase');

    return query;
  }

  async findById(id: string | number) {
    const query = this.getJoin();
    query.where({ id: id });

    const source = query.getOne();

    if (typeof source === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return source;
    }
  }

  getResults(
    testGroup: TestGroup | number | string,
    each?: string | number,
    page?: string | number,
  ): Promise<[TestGroupResult[], number]> {
    if (testGroup instanceof TestGroup) {
      testGroup = testGroup.id;
    }
    const query = this.getJoin()
      .orderBy('testResult.date', 'DESC')
      .where({ testGroup: testGroup });

    if (!page) {
      page = '1';
    }

    if (each) {
      const per_page = Number(each);
      const offset = (Number(page) - 1) * per_page;
      query.take(per_page);
      query.skip(offset);
    }

    return query.getManyAndCount();
  }

  getResultsAll(
    each?: string | number,
    page?: string | number,
  ): Promise<[TestGroupResult[], number]> {
    const query = this.getJoin().orderBy('testResult.date', 'DESC');
    query.leftJoinAndSelect('testResult.testGroup', 'testGroup');

    if (!page) {
      page = '1';
    }

    if (each) {
      const per_page = Number(each);
      const offset = (Number(page) - 1) * per_page;
      query.take(per_page);
      query.skip(offset);
    }

    return query.getManyAndCount();
  }

  getResultsGraph(testGroup: TestGroup | number | string) {
    if (testGroup instanceof TestGroup) {
      testGroup = testGroup.id;
    }
    const query = this.createQueryBuilder('testResult')
      .leftJoin('testResult.tests', 'test')
      .leftJoin('test.testCase', 'testCase')
      .addSelect('COUNT(*)', 'total')
      .addSelect('testResult.date', 'date')
      .addSelect(
        'COUNT(case when test.percentage >= testCase.successPercent then 1 else null end)',
        'success',
      )
      .orderBy('testResult.date', 'DESC')
      .where({ testGroup: testGroup })
      .groupBy('testResult.date, testResult.id');
    console.log(query.getSql());
    return query.getRawMany();
  }
}
