import { EntityRepository, Repository } from 'typeorm';
import { PublisherCategory } from '../entity/publisherCategory';
import { Error } from '../error';

@EntityRepository(PublisherCategory)
export class PublisherCategoryRepository extends Repository<PublisherCategory> {
  createAndSave(name: string): Promise<PublisherCategory> {
    const category = new PublisherCategory();

    return this.write(category, name);
  }

  async updatePublisherCategory(id: string, name: string): Promise<PublisherCategory> {
    const category = await this.findOne(id);

    if (category === undefined) {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    }

    return this.write(category, name);
  }

  async write(category: PublisherCategory, name: string) {
    category.name = name;

    return this.save(category);
  }

  async deletePublisherCategory(id: string) {
    const category = await this.findOne(id);

    if (typeof category === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return this.remove(category);
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
