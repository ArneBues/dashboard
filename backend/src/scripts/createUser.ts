import { createConnection, getRepository } from "typeorm";
import { User, UserRole } from "../entity/user";
import {mysql as ormconfig} from "../../config"

const PASSWORD = 'test';

createConnection(ormconfig).then((e) => {

  const user = new User();

  user.name = 'test';
  user.email = 'test@test.de'
  user.role = UserRole.ADMIN;
  
  user.password = user.createPasswordHash(PASSWORD);
  
  getRepository('user').save(user);
  
  console.log('Benutzer erstellt');
  console.log('Email: ' + user.email);
  console.log('Password: ' + PASSWORD)
})
