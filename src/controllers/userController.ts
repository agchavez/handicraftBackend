import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { generateJWT } from '../helpers/jwt.helper';
import User from '../models/userModel';

export const userGet = async (req:Request, res:Response)=>{
    
    res.status(202).json({
        msg:'GetUser'
    });
}

export const registerUser = async (req:Request, res:Response)=>{
    const {email, password, firtName, lastName, phone} =  req.body;
    //validar si el correo ya existe
    const user =  new User({
        email,firtName, lastName, password, phone
    })
    try {
        await user.save();
        const jwt = await generateJWT(user.id);
        res.status(200).json({
            msj: 'Usuario registrado',
            user,
            "token":jwt
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al guardar el usuario',
            error
        })
    }
}