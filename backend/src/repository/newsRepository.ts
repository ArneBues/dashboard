import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/news';
import { User } from '../entity/user';
import { Error } from '../error';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  async new(body: any, user?: User) {
    if (!user) return Promise.reject({ message: 'not logged in' });
    const source = new News();
    source.date = new Date();
    source.text = body.text;
    source.title = body.title;
    source.writer = user;

    return this.save(source);
  }

  async updateNews(id: string, body: any) {
    const source = await this.findById(id);

    source.text = body.text;
    source.title = body.title;

    return this.save(source);
  }

  async deleteNews(id: string) {
    return this.delete(id);
  }

  async findById(id: string | number) {
    const source = await this.findOne(id, { relations: ['writer'] });

    if (typeof source === 'undefined') {
      return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
    } else {
      return source;
    }
  }

  async paginate(each?: string | number, page?: string | number) {
    const newsQuery = this.createQueryBuilder('news').orderBy({ date: 'DESC' });
    newsQuery.leftJoinAndSelect('news.writer', 'user');
    if (!page) {
      page = '1';
    }

    if (each) {
      const per_page = Number(each);
      const offset = (Number(page) - 1) * per_page;
      newsQuery.take(per_page);
      newsQuery.skip(offset);
    }
    newsQuery.relation('writer');
    return newsQuery.getMany();
  }
}
