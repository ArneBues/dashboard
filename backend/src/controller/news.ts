import { getCustomRepository } from 'typeorm';
import { User } from '../entity/user';
import { NewsRepository } from '../repository/newsRepository';
import { BaseController } from './base';

export class NewsController extends BaseController {
  private newsRepository = getCustomRepository(NewsRepository);

  public async index(): Promise<void> {
    try {
      const count = await this.newsRepository.count();
      const result = await this.newsRepository.paginate(
        this.req.query.each?.toString(),
        this.req.query.page?.toString(),
      );
      this.response({
        count: count,
        page: this.req.params.page,
        each: this.req.params.each,
        result,
      });
    } catch (err) {
      this.response(err, 500);
    }
  }

  public show(): void {
    this.newsRepository
      .findById(this.req.params.id)
      .then((news) => {
        this.response(news);
      })
      .catch((err) => this.response(err, 500));
  }

  public new(): void {
    this.newsRepository
      .new(this.req.body, this.req.user as User)
      .then((news) => {
        this.response(news);
      })
      .catch((err) => this.response(err, 500));
  }

  public update(): void {
    this.newsRepository
      .updateNews(this.req.params.id, this.req.body)
      .then((news) => {
        this.response(news);
      })
      .catch((err) => this.response(err, 500));
  }

  public delete(): void {
    this.newsRepository
      .deleteNews(this.req.params.id)
      .then((news) => {
        this.index();
      })
      .catch((err) => this.response(err, 500));
  }
}
