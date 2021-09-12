import { Router,  } from "express";
import  { check } from 'express-validator';

import validatorCamp from "../middlewares/validatorCamp";
import { getAllUser, getUserByID, registerUser } from '../controllers/user.controller';
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

route.get('/',[
    validatorJwt
], getAllUser);

route.delete('/delete/:id',[
    check('id', 'El id es obligatorio').notEmpty(),
    validatorJwt,
    validatorCamp
], ()=>{});

route.get('/:id',
    [check('id', 'El id es obligatorio').notEmpty(),
    validatorJwt,
    validatorCamp], getUserByID
    );

export default route;