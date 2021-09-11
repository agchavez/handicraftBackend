import  express, { Application } from "express";
import cors from "cors";

import userRoute from "../routes/userRoute";
import uthRoute from "../routes/auth.route";
import dbConnection from "../db/dbConfig";

export default class Server{
    public app:Application;
    private port:string;
    private apiPath = {
        auth: "/api/auth",
        user: "/api/user",
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8080"
        

        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection(){
        
        await dbConnection();

    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        //Rutas publicas
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto '+ this.port);
            
        })
    }

    routes(){
         
        this.app.use(this.apiPath.auth, uthRoute);
        this.app.use(this.apiPath.user, userRoute);
        
    }
}