"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_emoji_1 = require("node-emoji");
const express_https_redirect_1 = __importDefault(require("express-https-redirect"));
const server_1 = __importDefault(require("./server"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = __importDefault(require("./database"));
const port = process.env.PORT || 3000;
server_1.default.use(express_https_redirect_1.default());
server_1.default.use(helmet_1.default());
database_1.default.authenticate().then(() => {
    server_1.default.listen(port, () => {
        // console.log(`all envs: ${JSON.stringify(process.env, null, 2)}`)
        // console.log(`process.env.npm_config_dev: ${process.env.npm_config_dev}`)
        console.log(`${node_emoji_1.emoji.ear} listening on ${port} ${node_emoji_1.emoji.ear}`);
    });
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map