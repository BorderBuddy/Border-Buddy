"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
function setup(User) {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, async (email, password, done) => {
        let user;
        try {
            user = await User.findOne({ where: { email: email.toLowerCase() } });
            if (!user) {
                return done(null, false, { message: 'No user by that email' });
            }
        }
        catch (e) {
            return done(e);
        }
        const authenticated = await user.authenticate(user, password);
        if (!authenticated) {
            return done(null, false, { message: 'Not a matching password' });
        }
        return done(null, user);
    }));
}
exports.setup = setup;
//# sourceMappingURL=passport.js.map