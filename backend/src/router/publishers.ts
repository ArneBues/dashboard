import express from 'express';
import { PublisherController } from '../controller/publisher';
import { isLoggedIn } from '../passport';

export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  new PublisherController(req, res).index();
});

router.get('/normal', (req, res) => {
  new PublisherController(req, res).normal();
});

router.post('/', isLoggedIn, (req, res) => {
  new PublisherController(req, res).new();
});

router.post('/filter', (req, res) => {
  new PublisherController(req, res).filter();
});

router.get('/:id', (req, res) => {
  new PublisherController(req, res).show();
});

router.put('/:id', isLoggedIn, (req, res) => {
  new PublisherController(req, res).update();
});

router.delete('/:id', isLoggedIn, (req, res) => {
  new PublisherController(req, res).delete();
});
