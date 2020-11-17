import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Source } from '../entity/source';
import { Error } from '../error';
import { PublisherRepository } from './publisherRepository';

@EntityRepository(Source)
export class SourceRepository extends Repository<Source> {
  private publisherRepository = getCustomRepository(PublisherRepository);

  async createAndSave(body: any) {
    const source = new Source();
    source.name = body.name;
    source.date = new Date(body.date);
    source.indexed = Boolean(body.indexed);
    console.log(body);

    source.publisher = body.publisher;

    return this.save(source);
  }

  async updateSource(id: string, body: any) {
    const source = await this.findOne(id);
    if (typeof source === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      source.name = body.name;
      source.indexed = Boolean(body.indexed);
      source.publisher = body.publisher;
      source.date = new Date(body.date);

      return this.save(source);
    }
  }

  async deleteSource(id: string) {
    return this.delete(id);
  }

  async findById(id: string | number) {
    const source = await this.findOne(id);

    if (typeof source === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return source;
    }
  }
}
