import express from 'express';
import { PublisherCategoryController } from '../controller/publisherCategory';
import { isLoggedIn } from '../passport';

export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  new PublisherCategoryController(req, res).index();
});

router.post('/', isLoggedIn, (req, res) => {
  new PublisherCategoryController(req, res).new();
});

router.put('/:id', isLoggedIn, (req, res) => {
  new PublisherCategoryController(req, res).update();
});

router.delete('/:id', isLoggedIn, (req, res) => {
  new PublisherCategoryController(req, res).delete();
});
