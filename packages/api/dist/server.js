"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const volleyball_1 = __importDefault(require("volleyball"));
const endpoints_1 = require("./endpoints");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(volleyball_1.default);
endpoints_1.addRoutes(app);
const staticContent = path_1.default.resolve(__dirname, 'public');
app.use(express_1.default.static(staticContent));
app.get('*', (req, res) => {
    res.sendFile(staticContent + '/index.html');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send(err.message);
});
exports.default = app;
//# sourceMappingURL=server.js.map