import jwt from 'jsonwebtoken';
import {config} from '../config';
import {Repository} from '../../database/models';

export function signToken(id) {
  return jwt.sign({id: id}, config.secrets.session, {
    expiresIn: '2 hours'
  });
}

export function verifyToken(token, repository = Repository) {
  const userRepository = repository.users;
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.session, (err, user) => {
      if (err) {
        reject(err.message);
        return;
      }

      userRepository
        .findOne({id: user.id})
        .then(user => {
          if (!user) {
            reject('User not found');
          } else {
            resolve(user);
          }
        })
    });
  });
}

export function protectedEndpoint(endpoint, tokenVerifier = verifyToken) {
  return (req, res, next) => {
    tokenVerifier(req.headers.authorization)
      .then(() => endpoint(req, res, next))
      .catch(() => res.status(401).send('Unauthorized').end());
  };
}
