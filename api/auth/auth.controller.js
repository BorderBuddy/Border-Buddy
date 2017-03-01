import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { signToken } from './auth.service';

export default function(req, res, next) {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id);
    res.json({ token });
  })(req, res, next);
}