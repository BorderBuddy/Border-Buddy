"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flight_prod_1 = __importDefault(require("./flight.prod"));
const flight_dev_1 = __importDefault(require("./flight.dev"));
console.log(process.env.npm_config_dev);
exports.default = process.env.npm_config_dev ? flight_dev_1.default : flight_prod_1.default;
//# sourceMappingURL=flight.js.map