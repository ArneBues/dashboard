import { getCustomRepository } from 'typeorm';
import { PublisherCategoryRepository } from '../repository/publisherCategoryRepository';
import { BaseController } from './base';

export class PublisherCategoryController extends BaseController {
  private repository: PublisherCategoryRepository = getCustomRepository(
    PublisherCategoryRepository,
  );

  public index(): void {
    this.repository
      .find()
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public new(): void {
    this.repository
      .createAndSave(this.req.body.name)
      .then((data) => {
        this.index();
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public update(): void {
    this.repository
      .updatePublisherCategory(this.req.params.id, this.req.body.name)
      .then((data) => {
        this.index();
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.repository
      .deletePublisherCategory(this.req.params.id)
      .then((data) => {
        this.index();
      })
      .catch((e) => {
        this.response({ message: 'in_use' }, 500);
      });
  }
}
