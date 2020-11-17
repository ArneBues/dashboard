import express from 'express';
import multer from 'multer';
import { TestController } from '../controller/test';
import { TestResultController } from '../controller/testResult';
import { isLoggedIn } from '../passport';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  new TestController(req, res).index();
});

router.get('/tests/:id', (req, res) => {
  new TestController(req, res).tests();
});

router.get('/cases/:groupID', (req, res) => {
  new TestController(req, res).testCasesByGroup();
});

router.get('/manuell/', (req, res) => {
  new TestController(req, res).manuell();
});

router.post('/', isLoggedIn, upload.single('file'), (req, res) => {
  new TestController(req, res).new();
});

router.get('/:id', (req, res) => {
  new TestController(req, res).show();
});

router.put('/:id', isLoggedIn, upload.single('file'), (req, res) => {
  new TestController(req, res).update();
});

router.delete('/:id', isLoggedIn, (req, res) => {
  new TestController(req, res).delete();
});

router.get('/download/:id', (req, res) => {
  new TestController(req, res).downloadFile();
});

router.get('/executetest/:id', (req, res) => {
  new TestController(req, res).executeTest();
});

router.get('/result/:id', (req, res) => {
  new TestResultController(req, res).show();
});
