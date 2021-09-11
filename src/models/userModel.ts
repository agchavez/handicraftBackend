
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firtName: {
        type: String,
        lowercase:true,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    email: {
        unique:true,
        lowercase:true,
        type: String,
        required: [true, 'El correo electronico es obligatorio']
    },
    lastName: {
        type: String,
        lowercase:true,
        required:[true, 'El nombre electronico es obligatorio']
    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria']
    },
    phone:{
        type:Number,
        min: [8, 'Numero de telefono no valido'],
        required:[true, 'El numero es obligatoria']
    }
});

export default model('User', userSchema);
