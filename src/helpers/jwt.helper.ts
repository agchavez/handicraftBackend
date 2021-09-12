import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user.model';

export const generateJWT = async(uid:any)=>{
    return new Promise((resolve, reject) => {
        //Los datos que va contener el JWT
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY!, {
            expiresIn:'4h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('Error al generar el jwt')
            }else{
                resolve(token)
            }
        })

    })
}


const validatorJwt = async(req:Request, res:Response, next:any)=>{
    const token = req.header('token');
    if(!token){
        return res.status(400).json({
            msj:"No hay token en la peticion"
        });
    }
    try {
        const temp:any = jwt.verify(token, process.env.JWT_KEY!);
        req.body.uid = temp['uid'];
        
        const user = await User.findById(temp['uid'])
        if(!user){
            res.status(401).json({
                msg:"Token no valido - El usuario no existe"
            })
        }
        if(!user?.status){
            return res.status(401).json({
                msg:"Token no valido - Usuario eliminado"
            })
        }
        req.body.user = user;
        next();     
    } catch (error) {
        res.status(500).json({
            msg:"Error del servidor",
            error
        })   
    }
}
export {
    validatorJwt
}