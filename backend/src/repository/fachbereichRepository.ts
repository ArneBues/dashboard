import { EntityRepository, Repository } from 'typeorm';
import { Fachbereich } from '../entity/fachbereich';
import { Error } from '../error';

@EntityRepository(Fachbereich)
export class FachbereichRepository extends Repository<Fachbereich> {
  createAndSave(name: string): Promise<Fachbereich> {
    const fachbereich = new Fachbereich();

    return this.write(fachbereich, name);
  }

  async updateFachbereich(id: string, name: string): Promise<Fachbereich> {
    const fachbereich = await this.findOne(id);

    if (fachbereich === undefined) {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    }

    return this.write(fachbereich, name);
  }

  async write(fachbereich: Fachbereich, name: string) {
    fachbereich.name = name;

    return this.save(fachbereich);
  }

  async deleteFachbereich(id: string) {
    const fachbereich = await this.findOne(id);

    if (typeof fachbereich === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return this.remove(fachbereich);
    }
  }

  async findById(id: string | number) {
    const fachbereich = await this.findOne(id);

    if (typeof fachbereich === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return fachbereich;
    }
  }
}
