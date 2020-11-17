import { getCustomRepository } from 'typeorm';
import { PublisherRepository } from '../repository/publisherRepository';
import { SourceRepository } from '../repository/sourceRepository';
import { BaseController } from './base';

export class SourceController extends BaseController {
  private sourceRepository: SourceRepository = getCustomRepository(SourceRepository);
  private publisherRepository: PublisherRepository = getCustomRepository(
    PublisherRepository,
  );

  public index(): void {
    this.sourceRepository
      .find()
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public show(): void {
    this.sourceRepository
      .findOne(this.req.params.id, { relations: ['publisher'] })
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public showByPublisher(): void {
    this.sourceRepository
      .findOne({ where: { publisher: this.req.params.publisherId } })
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public new(): void {
    this.publisherRepository
      .findById(this.req.body.publisherID)
      .then((publisher) => {
        return this.sourceRepository.createAndSave(this.req.body);
      })
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public update(): void {
    this.sourceRepository
      .updateSource(this.req.params.id, this.req.body)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.sourceRepository
      .deleteSource(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }
}
