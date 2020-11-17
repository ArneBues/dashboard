import bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User, UserRole } from '../entity/user';
import { Error } from '../error';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async newUser(body: any) {
    const source = new User();
    source.email = body.email;
    source.name = body.name;
    source.password = bcrypt.hashSync(body.password, 10);
    switch (body.userRole) {
      case 'Admin':
        source.role = UserRole.ADMIN;
        break;

      default:
        source.role = UserRole.EDITOR;
        break;
    }

    return this.save(source);
  }

  async updateUser(id: string, body: any) {
    const source = await this.findById(id);

    source.name = body.name;
    source.email = body.email;

    if (body.password) source.password = bcrypt.hashSync(body.password, 10);
    return this.save(source);
  }

  async changePassword(id: string, body: any) {
    const source = await this.findById(id);

    source.password = bcrypt.hashSync(body.password, 10);

    return this.save(source);
  }

  async deleteUser(id: string) {
    const user = await this.findById(id);
    user.email = '';
    user.password = '';
    user.deleted = true;
    user.role = UserRole.DELETED;
    return this.save(user);
  }

  async findById(id: string | number) {
    const source = await this.findOne(id, { where: { deleted: false } });
    try {
      if (typeof source === 'undefined') {
        return Promise.reject(Error.OBJECT_DOES_NOT_EXISTS);
      } else return source;
    } catch (e) {
      console.log(e);
      return Promise.reject('Fail');
    }
  }
}
