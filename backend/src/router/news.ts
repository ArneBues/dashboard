import express from 'express';
import { NewsController } from '../controller/news';
import { isEditor, isLoggedIn } from '../passport';

export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  new NewsController(req, res).index();
});

router.post('/', isLoggedIn, isEditor, (req, res) => {
  new NewsController(req, res).new();
});

router.put('/:id', isLoggedIn, isEditor, (req, res) => {
  new NewsController(req, res).update();
});

router.get('/:id', (req, res) => {
  new NewsController(req, res).show();
});

router.delete('/:id', isLoggedIn, isEditor, (req, res) => {
  new NewsController(req, res).delete();
});
