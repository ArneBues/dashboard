import { ConnectionOptions } from 'typeorm';
import { Fachbereich } from './src/entity/fachbereich';
import { News } from './src/entity/news';
import { Publisher } from './src/entity/publisher';
import { PublisherCategory } from './src/entity/publisherCategory';
import { Source } from './src/entity/source';
import { SourceText } from './src/entity/sourceText';
import { Test } from './src/entity/test';
import { TestCase } from './src/entity/testcase';
import { TestGroup } from './src/entity/testGroup';
import { TestGroupResult } from './src/entity/testGroupResult';
import { User } from './src/entity/user';

// Mysql Config
// Siehe https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md
export const mysql = {
  name: 'default',
  type: 'mysql',
  host: 'f80b6byii2vwv8cx.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  database: '',
  username: '',
  password: '',
  port: 3306,
  synchronize: true,
  logging: false,
  entities: [
    News,
    User,
    Test,
    TestCase,
    TestGroup,
    Publisher,
    Source,
    SourceText,
    TestGroupResult,
    Fachbereich,
    PublisherCategory,
  ],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;

export const PORT = 8000;

// Absende E-Mail Adresse
export const emailadress = '';

// Email von Urkund an denen die Dokumente zum
// überprüfen geschickt werden sollen
export const urkundmail = '';

// Absende Konfiguration siehe: https://nodemailer.com/smtp/
export const sendConfig = {
  host: '',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: '',
  },
  tls: {
    ciphers: 'SSLv3',
  },
};

// Konfiguration Email empfangen: https://www.npmjs.com/package/imap-simple
export const imapConfig = {
  imap: {
    user: '',
    password: '',
    host: '',
    port: 993,
    tls: true,
    authTimeout: 3000,
  },
};
