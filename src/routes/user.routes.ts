import { Router,  } from "express";
import  { check } from 'express-validator';

import validatorCamp from "../middlewares/validatorCamp";
import { getAllUser, registerUser } from '../controllers/user.controller';
import { emailExist } from '../helpers/dbValidator';
import { validatorJwt } from "../helpers/jwt.helper";


const route = Router();

route.post('/new',[
    check('lastName','El segundo nombre es obligatorio').not().isEmpty(),
    check('firtName','El primer nombre es obligatorio').not().isEmpty(),
    check('phone','El numero de telefono es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('email').custom(emailExist),
    validatorCamp
], registerUser);

route.get('/all',[
    validatorJwt
], getAllUser);

export default route;