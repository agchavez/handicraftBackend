import  express, { Application } from "express";
import cors from "cors";

import userRoute from "../routes/userRoute";
import dbConnection from "../db/dbConfig";

export default class Server{
    private app:Application;
    private port:string;
    private apiPath = {
        user: "/api/user",
        auth:"/api/auth"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8080"
        

        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection(){
        console.log("here");
        
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
         
        this.app.use(this.apiPath.user, userRoute)
    }
}