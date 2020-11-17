import express from 'express';
import { UserController } from '../controller/user';
import { isAdmin, isAdminOrSelf, isLoggedIn } from '../passport';

export const router: express.Router = express.Router();

router.post('/', isLoggedIn, isAdmin, (req, res) => {
  new UserController(req, res).new();
});

router.get('/', isLoggedIn, isAdmin, (req, res) => {
  new UserController(req, res).show();
});

router.get('/status', (req, res) => {
  new UserController(req, res).getCurrent();
});

router.get('/logout', (req, res) => {
  new UserController(req, res).logOut();
});

router.get('/:id', (req, res) => {
  new UserController(req, res).get();
});

router.put('/:id', isLoggedIn, isAdminOrSelf, (req, res) => {
  new UserController(req, res).update();
});

router.delete('/:id', isLoggedIn, isAdmin, (req, res) => {
  new UserController(req, res).delete();
});
