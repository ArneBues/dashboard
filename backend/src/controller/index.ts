import { BaseController } from './base';

export class IndexController extends BaseController {
  public index(): void {
    this.res.send('Index Controller');
  }
}
