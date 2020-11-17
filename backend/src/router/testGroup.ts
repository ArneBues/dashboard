import express from 'express';
import { TestGroupController } from '../controller/testGroup';
import { isLoggedIn } from '../passport';
export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  new TestGroupController(req, res).index();
});

router.get('/:id', (req, res) => {
  new TestGroupController(req, res).show();
});

router.get('/result/graph/:id', (req, res) => {
  new TestGroupController(req, res).getChart();
});

router.get('/result/:id', (req, res) => {
  new TestGroupController(req, res).getResults();
});

router.put('/:id', isLoggedIn, (req, res) => {
  new TestGroupController(req, res).update();
});

router.delete('/:id', isLoggedIn, (req, res) => {
  new TestGroupController(req, res).delete();
});

router.post('/', isLoggedIn, (req, res) => {
  new TestGroupController(req, res).new();
});
