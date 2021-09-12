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
exports.validatorJwt = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generateJWT = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        //Los datos que va contener el JWT
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error al generar el jwt');
            }
            else {
                resolve(token);
            }
        });
    });
});
exports.generateJWT = generateJWT;
const validatorJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('token');
    if (!token) {
        return res.status(400).json({
            msj: "No hay token en la peticion"
        });
    }
    try {
        const temp = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.body.uid = temp['uid'];
        const user = yield user_model_1.default.findById(temp['uid']);
        if (!user) {
            res.status(401).json({
                msg: "Token no valido - El usuario no existe"
            });
        }
        if (!(user === null || user === void 0 ? void 0 : user.status)) {
            return res.status(401).json({
                msg: "Token no valido - Usuario eliminado"
            });
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            msg: "Error del servidor",
            error
        });
    }
});
exports.validatorJwt = validatorJwt;
//# sourceMappingURL=jwt.helper.js.map