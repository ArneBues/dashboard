import express from 'express';
import { FachbereichController } from '../controller/fachbereich';
import { isEditor, isLoggedIn } from '../passport';

export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  new FachbereichController(req, res).index();
  console.log('yo');
});

router.post('/', isLoggedIn, isEditor, (req, res) => {
  new FachbereichController(req, res).new();
});

router.put('/:id', isLoggedIn, isEditor, (req, res) => {
  new FachbereichController(req, res).update();
});

router.get('/:id', (req, res) => {
  new FachbereichController(req, res).show();
});

router.delete('/:id', isLoggedIn, isEditor, (req, res) => {
  new FachbereichController(req, res).delete();
});
