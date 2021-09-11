import { Router,  } from "express";
import  { check } from 'express-validator';

import validatorCamp from "../middlewares/validatorCamp";
import { registerUser } from '../controllers/userController';
import { emailExist } from '../helpers/dbValidator';


const route = Router();

route.post('/post',[
    check('lastName','El segundo nombre es obligatorio').not().isEmpty(),
    check('firtName','El primer nombre es obligatorio').not().isEmpty(),
    check('phone','El numero de telefono es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('email').custom(emailExist),
    validatorCamp
    
], registerUser);

export default route;