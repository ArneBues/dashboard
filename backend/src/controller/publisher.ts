import { getCustomRepository } from 'typeorm';
import { Fachbereich } from '../entity/fachbereich';
import { Publisher } from '../entity/publisher';
import { PublisherRepository } from '../repository/publisherRepository';
import { BaseController } from './base';

export class PublisherController extends BaseController {
  private publisherRepository: PublisherRepository = getCustomRepository(
    PublisherRepository,
  );

  public normal(): void {
    this.publisherRepository
      .find()
      .then((tree) => {
        this.response(tree);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public index(): void {
    this.publisherRepository
      .find()
      .then((data) => {
        this.response(this.calculateGoodAndBad(data));
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public show(): void {
    this.publisherRepository
      .findById(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public new(): void {
    this.publisherRepository
      .createAndSave(
        this.req.body.name,
        this.req.body.website,
        this.req.body.description,
        this.req.body.fachbereich,
        this.req.body.category,
        this.req.body.indexed == true,
      )
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  public update(): void {
    this.publisherRepository
      .updatePublisher(
        this.req.params.id,
        this.req.body.name,
        this.req.body.website,
        this.req.body.description,
        this.req.body.fachbereich,
        this.req.body.category,
        this.req.body.indexed == true,
      )
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.publisherRepository
      .deletePublisher(this.req.params.id)
      .then((data) => {
        this.index();
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public filter(): void {
    if (
      typeof this.req.body.fachbereich === undefined ||
      this.req.body.fachbereich.length === 0 ||
      this.req.body.fachbereich === ''
    ) {
      return this.index();
    }
    let fachbereichIds: number[] = [];
    this.req.body.fachbereich.forEach((el: Fachbereich) => {
      fachbereichIds.push(Number(el.id));
    });

    let test = fachbereichIds.join(',');

    const qb = this.publisherRepository
      .createQueryBuilder('publisher')
      .innerJoinAndSelect(
        'publisher.fachbereich',
        'fachbereich',
        'fachbereich.id IN (' + test + ')',
      )
      .leftJoinAndSelect('publisher.source', 'source')
      .leftJoinAndSelect('publisher.category', 'category');

    qb.getMany()
      .then((data) => {
        this.response(this.calculateGoodAndBad(data));
      })
      .catch((e) => {
        console.log(e);
        this.response(e, 500);
      });
  }

  private calculateGoodAndBad(pubs: Publisher[]) {
    pubs.forEach((pub) => {
      pub.percentageIndexed = this.calculateGoodAndBadHelper(pub);
    });
    return pubs;
  }

  private calculateGoodAndBadHelper(pub: Publisher): number {
    let good = 0;
    let bad = 0;

    pub.source.forEach((s) => {
      if (s.indexed) good += 1;
      else bad += 1;
    });

    if (good + bad === 0) return 100;

    return Math.ceil((good / (good + bad)) * 100);
  }
}
