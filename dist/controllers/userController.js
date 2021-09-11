"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.userGet = void 0;
const jwt_helper_1 = require("../helpers/jwt.helper");
const userModel_1 = __importDefault(require("../models/userModel"));
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(202).json({
        msg: 'GetUser'
    });
});
exports.userGet = userGet;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firtName, lastName, phone } = req.body;
    //validar si el correo ya existe
    const user = new userModel_1.default({
        email, firtName, lastName, password, phone
    });
    try {
        yield user.save();
        const jwt = yield (0, jwt_helper_1.generateJWT)(user.id);
        res.status(200).json({
            msj: 'Usuario registrado',
            user,
            "token": jwt
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al guardar el usuario',
            error
        });
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=userController.js.map