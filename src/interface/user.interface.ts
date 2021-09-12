import {Document } from  'mongoose';
export interface UserInterface extends  Document{
    firtName: string;
    lastName: string;
    password: string;
    email: string;
    phone:number;
    status: boolean;
  }
