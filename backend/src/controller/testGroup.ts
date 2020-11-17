import { getCustomRepository } from 'typeorm';
import { TestGroupRepository } from '../repository/testGroupRepository';
import { TestGroupResultRepository } from '../repository/testGroupResult';
import { BaseController } from './base';

export class TestGroupController extends BaseController {
  private testGroupRepository = getCustomRepository(TestGroupRepository);
  private testResultRepoistory = getCustomRepository(TestGroupResultRepository);
  public index(): void {
    this.testGroupRepository
      .find()
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public show(): void {
    this.testGroupRepository
      .findById(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public new(): void {
    console.log(this.req.body);
    this.testGroupRepository
      .createAndSave(this.req.body)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public update(): void {
    this.testGroupRepository
      .updateTestGroup(this.req.params.id, this.req.body)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.testGroupRepository
      .deleteTestGroup(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public getResults(): void {
    this.testResultRepoistory
      .getResults(
        this.req.params.id,
        this.req.query.each?.toString(),
        this.req.query.page?.toString(),
      )
      .then(([data, count]) => {
        this.response({ count, data });
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public getChart(): void {
    this.testResultRepoistory
      .getResultsGraph(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }
}
