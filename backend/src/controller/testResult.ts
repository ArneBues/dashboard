import { getCustomRepository } from 'typeorm';
import { TestGroupResult } from '../entity/testGroupResult';
import { TestGroupResultRepository } from '../repository/testGroupResult';
import { BaseController } from './base';

export class TestResultController extends BaseController {
  private testResultRepository = getCustomRepository(TestGroupResultRepository);

  public index(): void {
    this.testResultRepository
      .getResultsAll(Number(this.req.query.limit))
      .then(([data, count]) => {
        this.response({ count, data: this.getSuccessAndFailureRates(data) });
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public show(): void {
    this.testResultRepository
      .findById(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  private getSuccessAndFailureRates(results: TestGroupResult[]) {
    results.forEach((result) => {
      [result.success, result.failure] = this.getSuccessAndFailureRatesHelper(result);
    });
    return results;
  }

  private getSuccessAndFailureRatesHelper(result: TestGroupResult): [number, number] {
    let failure = 0;
    let success = 0;

    result.tests.forEach((test) => {
      if (test.percentage >= test.testCase!.successPercent) success += 1;
      else failure += 1;
    });
    return [success, failure];
  }
}
