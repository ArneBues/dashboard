import express from 'express';
import { check, validationResult } from 'express-validator';

export const validatePublisher = [
  check('name').isLength({ min: 1, max: 30 }),
  check('website').isLength({ min: 1, max: 50 }),
  check('description').isLength({ min: 1, max: 500 }),
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void | express.Response<never> => {
    const errors = validationResult(req).array();
    if (errors.length) {
      return res.status(422).json({ errors });
    }

    next();
  },
];
