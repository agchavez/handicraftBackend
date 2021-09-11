"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validatorCamp_1 = __importDefault(require("../middlewares/validatorCamp"));
const userController_1 = require("../controllers/userController");
const dbValidator_1 = require("../helpers/dbValidator");
const route = (0, express_1.Router)();
route.post('/post', [
    (0, express_validator_1.check)('lastName', 'El segundo nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('firtName', 'El primer nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'El numero de telefono es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('email').custom(dbValidator_1.emailExist),
    validatorCamp_1.default
], userController_1.registerUser);
exports.default = route;
//# sourceMappingURL=userRoute.js.map