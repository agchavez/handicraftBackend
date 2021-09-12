"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validatorCamp_1 = __importDefault(require("../middlewares/validatorCamp"));
const auth_controller_1 = require("../controllers/auth.controller");
const route = (0, express_1.Router)();
route.get('/login', [
    (0, express_validator_1.check)('password', 'El numero de telefono es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    validatorCamp_1.default
], auth_controller_1.loginAuth);
exports.default = route;
//# sourceMappingURL=auth.route.js.map