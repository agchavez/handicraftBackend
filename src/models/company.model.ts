import { Schema, model, SchemaTypes } from "mongoose";

const companySchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    idUser:{
        type: SchemaTypes.ObjectId,
        required: [true, 'El id del usuario es obligatorio'],
        ref:'User'
    }

})


export default model('Company', companySchema);