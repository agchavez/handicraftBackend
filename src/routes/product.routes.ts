import { Router,  } from "express";
import  { check } from 'express-validator';

import validatorCamp from "../middlewares/validatorCamp";
import { getAllUser, getUserByID, registerUser } from '../controllers/user.controller';
import { emailExist } from '../helpers/dbValidator';
import { validatorJwt } from "../helpers/jwt.helper";


const route = Router();

route.get('', ()=>{});

route.post('',()=>{});
