"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    firtName: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'El correo electronico es obligatorio']
    },
    lastName: {
        type: String,
        required: [true, 'El nombre electronico es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    phone: {
        type: Number,
        min: [8, 'Numero de telefono no valido'],
        required: [true, 'El numero es obligatoria']
    }
});
exports.default = model('User', userSchema);
//# sourceMappingURL=userModel.js.map