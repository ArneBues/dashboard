import { getCustomRepository } from 'typeorm';
import { FachbereichRepository } from '../repository/fachbereichRepository';
import { BaseController } from './base';

export class FachbereichController extends BaseController {
  private fachbereichRepository: FachbereichRepository = getCustomRepository(
    FachbereichRepository,
  );

  public normal(): void {
    this.fachbereichRepository
      .find()
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public index(): void {
    this.fachbereichRepository
      .find()
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public show(): void {
    this.fachbereichRepository
      .findById(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public new(): void {
    this.fachbereichRepository
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
    this.fachbereichRepository
      .updateFachbereich(this.req.params.id, this.req.body.name)
      .then((data) => {
        this.index();
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.fachbereichRepository
      .deleteFachbereich(this.req.params.id)
      .then((data) => {
        this.index();
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }
}
