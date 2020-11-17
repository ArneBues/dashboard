import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { getCustomRepository } from 'typeorm';
import { User, UserRole } from './entity/user';
import { UserRepository } from './repository/userRepository';

export function initializePassport() {
  const userRepository = getCustomRepository(UserRepository);

  const LocalStrategy = passportLocal.Strategy;

  passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    userRepository
      .findOne(id)
      .then((user) => {
        done(undefined, user);
      })
      .catch((err) => done(err, {}));
  });

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.email', 'user.role'])
        .addSelect('user.password')
        .where({ email: email.toLowerCase() })
        .getOne()
        .then((user) => {
          if (user === undefined) {
            return done(undefined, false, { message: `Email ${email} not found.` });
          }
          return user.comparePassword(password).then(async (result) => {
            if (result) {
              return done(undefined, await userRepository.findById(user.id));
            } else {
              done(undefined, false, { message: 'Invalid email or password.' });
            }
          });
        })
        .catch((e) => {
          done(e, false, { message: 'Login Failed' });
        });
    }),
  );
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user.role === UserRole.ADMIN) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: { message: 'not authorized' },
    });
  }
};

export const isAdminOrSelf = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user.role === UserRole.ADMIN || user.id === Number(req.params.id)) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: { message: 'not authorized' },
    });
  }
};

export const isEditor = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user.role === UserRole.ADMIN || user.role === UserRole.EDITOR) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: { message: 'not authorized' },
    });
  }
};
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: { message: 'not authorized' },
    });
  }
};
