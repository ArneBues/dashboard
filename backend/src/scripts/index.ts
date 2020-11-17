import { createConnection } from 'typeorm';
import { mysql as ormconfig } from '../../config';
import { checkMails, SendTestGroups } from './functions';

console.log(ormconfig);
createConnection(ormconfig).then(() => {
  checkMails();
  setInterval(checkMails, 10000);
  SendTestGroups();
});
