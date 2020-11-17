import express from 'express';
import passport from 'passport';
import { ControlPanelController } from '../controller/controlpanel';
import { IndexController } from '../controller/index';
import { SourceController } from '../controller/source';
import { TestResultController } from '../controller/testResult';
import { UserController } from '../controller/user';
import { router as fachbereich } from './fachbereich';
import { router as news } from './news';
import { router as publishers } from './publishers';
import { router as publisherCategory } from './publishersCategory';
import { router as testcase } from './test';
import { router as testgroup } from './testGroup';
import { router as user } from './user';

export const router: express.Router = express.Router();

// Default Content is JSON

router.use((req, res, next) => {
  console.log(req.method, req.url);
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/', (req, res) => {
  new IndexController(req, res).index();
});

router.use('/publishers/category', publisherCategory);
router.use('/publishers', publishers);
router.use('/test', testcase);
router.use('/test-group', testgroup);
router.use('/user', user);
router.use('/news', news);
router.use('/fachbereich', fachbereich);

router.get('/sources', (req, res) => {
  new SourceController(req, res).index();
});

router.post('/sources', (req, res) => {
  new SourceController(req, res).new();
});

router.get('/sources/:id', (req, res) => {
  new SourceController(req, res).show();
});

router.get('/sources/publisher/:id', (req, res) => {
  new SourceController(req, res).show();
});

router.get('/testresult/', (req, res) => {
  new TestResultController(req, res).index();
});

router.put('/sources/:id', (req, res) => {
  new SourceController(req, res).update();
});

router.delete('/sources/:id', (req, res) => {
  new SourceController(req, res).delete();
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  new UserController(req, res).login();
});

router.get('/controlpanel/check', (req, res) => {
  new ControlPanelController(req, res).checkEmails();
});

router.get('/controlpanel/send', (req, res) => {
  new ControlPanelController(req, res).sendTestGroup();
});
