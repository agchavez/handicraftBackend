import { Router, Request, Response } from 'express';
import { check } from "express-validator";

import validatorCamp from "../middlewares/validatorCamp";
import { loginAuth } from '../controllers/auth.controller';

const route = Router();

route.get('/login',[
    check('password','El numero de telefono es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validatorCamp
], loginAuth);

export default route;