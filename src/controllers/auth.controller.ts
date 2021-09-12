import User from "../models/user.model"
import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/jwt.helper';

export const loginAuth = async(req:Request, res:Response)=> {
    const { email, password } = req.body;
    try {        
        const user:any = await User.findOne({email});
        if(!user){
           return res.status(400).json({
                msj:`El correo ${email}, no esta registrado`
            });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"La contraseña es incorrecta"
            })
        }
        const token = await generateJWT(user.id);
        res.status(200).json({
            msj: "ok",
            user,
            token
        })        
    } catch (error) {
        res.status(500).json({
            msj:"Error login",
            error
        })
    }
}