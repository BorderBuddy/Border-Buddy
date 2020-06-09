"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const auth_service_1 = require("../auth/auth.service");
const base = '/api/user';
exports.default = (app) => {
    app.get(base + '/', auth_service_1.protectedEndpoint(user_controller_1.index));
    app.get(base + '/me', auth_service_1.protectedEndpoint(user_controller_1.me));
    app.get(base + '/:id', auth_service_1.protectedEndpoint(user_controller_1.show));
    app.post(base + '/', auth_service_1.protectedEndpoint(user_controller_1.create));
    app.put(base + '/:id', auth_service_1.protectedEndpoint(user_controller_1.update));
    app.put(base + '/:id/password', auth_service_1.protectedEndpoint(user_controller_1.changePassword));
    app.delete(base + '/:id', auth_service_1.protectedEndpoint(user_controller_1.destroy));
};
//# sourceMappingURL=user.route.js.map