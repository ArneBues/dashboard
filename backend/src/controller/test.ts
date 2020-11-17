import { getCustomRepository } from 'typeorm';
import { TestCaseRepository } from '../repository/testCaseRepository';
import { TestRepository } from '../repository/testRepository';
import { BaseController } from './base';

export class TestController extends BaseController {
  private testCaseRepository: TestCaseRepository = getCustomRepository(
    TestCaseRepository,
  );
  private testRepository: TestRepository = getCustomRepository(TestRepository);

  public index(): void {
    this.testCaseRepository
      .find({ where: { manuell: false } })
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public manuell(): void {
    this.testCaseRepository
      .find({ where: { manuell: true } })
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public show(): void {
    this.testCaseRepository
      .findById(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public new(): void {
    const testCase = this.testCaseRepository.createAndSave(this.req.body, this.req.file);
    testCase
      .then((e) => {
        return this.testRepository.createTest(e);
      })
      .then((test) => {
        this.req.app
          .get('sendMail')
          .sendMail(test, this.req.file.buffer)
          .then(() => {
            this.response(Promise.resolve({ message: 'Test Saved and Email Sent' }));
            console.log('it worked');
          })
          .catch((e: any) => {
            this.response(Promise.reject({ message: 'error' }));
            console.log(e);
          });
      })

      .catch((e) => this.response(Promise.reject(e)));
  }

  public executeTest(): void {
    const testcase = this.testCaseRepository.findById(this.req.params.id);
    testcase
      .then((e) => {
        return this.testRepository.createTest(e);
      })
      .then((test) => {
        this.req.app
          .get('sendMail')
          .sendMail(test)
          .then(() => {
            this.response({ message: 'Test Saved and Email Sent' });
          })
          .catch((e: any) => {
            this.response({ message: 'Could Sent Test' }, 500);
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public update(): void {
    this.testCaseRepository
      .updateTestCase(this.req.params.id, this.req.body, this.req.file)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.testCaseRepository
      .deleteTestCase(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public tests(): void {
    this.testRepository
      .findByTestCaseID(this.req.params.id, this.req.query.limit?.toString())
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public downloadFile(): void {
    this.testCaseRepository
      .createQueryBuilder('testcase')
      .addSelect('testcase.file')
      .where({ id: this.req.params.id })
      .getOne()
      .then((testCase) => {
        console.log(testCase);
        if (testCase) {
          this.res.set({
            'Content-Disposition': 'attachment; filename="' + testCase.filename + '"',
          });
          this.res.write(testCase.file, 'binary');
          this.res.end();
        }
      })
      .catch((e: Error) => {
        this.response(e, 500);
      });
  }

  public testCasesByGroup(): void {
    this.testCaseRepository
      .findByGroupId(this.req.params.groupID)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }
}
