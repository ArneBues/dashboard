import bcrypt from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  role!: UserRole;

  @Column({ default: false })
  deleted!: Boolean;

  public comparePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
  }

  public createPasswordHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  DELETED = '',
}
