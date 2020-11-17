import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import 'reflect-metadata';
import serveStatic from 'serve-static';
import { createConnection } from 'typeorm';
import { mysql as ormconfig, PORT } from '../config';
import SendMail from './email/sendMail';
import { sendConfig } from '../config';
//import { createAndSendTest } from './email/email';
import { initializePassport } from './passport';
import { router } from './router';

const SESSION_SECRET =
  'ecd3d45e1af6e0652adff97fe807b7c042bbfe3608fa45219f80b00431945a1bbff71188b4967084eb68151da059cb8ebe42d71608a3e0f2645d07402e286f47';

const app: express.Application = express();
const port = process.env.PORT || PORT;

createConnection(ormconfig)
  .then((e) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
      }),
    );
    initializePassport();
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    app.set('sendMail', new SendMail(sendConfig));
    app.use('/api', router);

    app.use(historyApiFallback());
    app.use(express.static(__dirname + '/../../public/'));
    app.use(express.static(__dirname + '/../public/'));

    app.listen(port, () => console.log('Server Stared on Port ' + port));

    //createAndSendTest();
  })
  .catch((e) => {
    console.error(e);
  });
