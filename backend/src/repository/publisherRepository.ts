import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Fachbereich } from '../entity/fachbereich';
import { Publisher } from '../entity/publisher';
import { PublisherCategory } from '../entity/publisherCategory';
import { Error } from '../error';
import { SourceRepository } from './sourceRepository';

@EntityRepository(Publisher)
export class PublisherRepository extends Repository<Publisher> {
  createAndSave(
    name: string,
    website: string,
    description: string,
    fachbereich: Fachbereich[],
    category: PublisherCategory,
    indexed: boolean,
  ): Promise<Publisher> {
    const publisher = new Publisher();

    return this.write(
      publisher,
      name,
      website,
      description,
      fachbereich,
      category,
      indexed,
    );
  }

  async updatePublisher(
    id: string,
    name: string,
    website: string,
    description: string,
    fachbereich: Fachbereich[],
    category: PublisherCategory,
    indexed: boolean,
  ): Promise<Publisher> {
    const publisher = await this.findOne(id);

    if (publisher === undefined) {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    }

    return this.write(
      publisher,
      name,
      website,
      description,
      fachbereich,
      category,
      indexed,
    );
  }

  async write(
    publisher: Publisher,
    name: string,
    website: string,
    description: string,
    fachbereich: Fachbereich[],
    category: PublisherCategory,
    indexed: boolean,
  ) {
    publisher.name = name;
    publisher.website = website;
    publisher.description = description;
    publisher.fachbereich = fachbereich;
    publisher.category = category;
    publisher.indexed = indexed;

    return this.save(publisher);
  }

  async deletePublisher(id: string) {
    const publisher = await this.findOne(id);

    if (typeof publisher === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      publisher.source.forEach((source) => {
        getCustomRepository(SourceRepository).remove(source);
      });
      return this.remove(publisher);
    }
  }

  async findById(id: string | number) {
    const publisher = await this.findOne(id);

    if (typeof publisher === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return publisher;
    }
  }
}
