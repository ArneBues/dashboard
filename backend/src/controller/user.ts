import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/userRepository';
import { BaseController } from './base';

export class UserController extends BaseController {
  private userRepository = getCustomRepository(UserRepository);

  public index(): void {
    this.res.send('Index Controller');
  }

  public show(): void {
    this.userRepository
      .find({ where: { deleted: false } })
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public login(): void {
    this.response(this.req.user);
  }

  public new(): void {
    this.userRepository
      .newUser(this.req.body)
      .then((data) => {
        this.response({ message: 'Benutzer erstellt!' });
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public update(): void {
    this.userRepository
      .updateUser(this.req.params.id, this.req.body)
      .then((data) => {
        this.response({ message: 'Benutzer erstellt!' });
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public delete(): void {
    this.userRepository
      .deleteUser(this.req.params.id)
      .then((data) => {
        this.response({ message: 'Benutzer gelöscht!' });
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public get(): void {
    this.userRepository
      .findById(this.req.params.id)
      .then((data) => {
        this.response(data);
      })
      .catch((e) => {
        this.response(e, 500);
      });
  }

  public getCurrent(): void {
    this.response(this.req.user);
  }

  public logOut(): void {
    this.req.logOut();
    this.response({ message: 'user logged out' });
  }
}
