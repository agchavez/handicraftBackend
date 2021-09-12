import {Request, Response} from 'express';
import bcryptjs from "bcryptjs";

import { generateJWT } from '../helpers/jwt.helper';
import User from '../models/user.model';
import { UserInterface } from '../interface/user.interface';

 const userGet = async (req:Request, res:Response)=>{
    res.status(202).json({
        msg:'GetUser'
    });
}
 const registerUser = async (req:Request, res:Response)=>{
    const {email, password, firtName, lastName, phone} =  req.body;
    //Encriptar contrseña
    const salt = bcryptjs.genSaltSync();
    const passwordEncrip = bcryptjs.hashSync( password.toString(), salt );
    const user =  new User({
        email,firtName, lastName, phone, password:passwordEncrip
    });
    try {
        await user.save();
        const jwt = await generateJWT(user.id);
        res.status(200).json({
            msj: 'Usuario registrado',
            user,
            "token":jwt
        });   
    } catch (error) {
        res.status(500).json({
            msg:'server error',
            error
        });
    }
}
const getAllUser = async(req:Request, res:Response)=>{
    
    const {limit = 1, from = 0} = req.query;
    const query = {status:true, limit}
    try {
        const [users, total] = await Promise.all
                                ([ User.find(query)
                                        .skip( Number( from ) )
                                        .limit(Number( limit )),
                                    User.countDocuments(query)]);
    res.status(200).json({
        users,
        total,
        ok:true
    });
    } catch (error) {
        res.status(500).json({
            msg:'server error',
            error
        });
        
    }
    

}

const getUserByID = async(req:Request, res:Response) =>{
    const {id} = req.params;
    try {
        
        try {
            const user = await User.findById(id);
            res.status(200).json({
                user,
                ok:true
            });
        } catch (error) {
            return res.status(400).json({
                msj:"El usuario no existe"
            });
        }
    } catch (error) {
        res.status(500).json({
            msg:'server error',
            error
        });   
    }
}
export {
    registerUser,
    userGet,
    getAllUser,
    getUserByID

}