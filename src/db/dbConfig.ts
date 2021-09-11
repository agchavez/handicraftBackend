import mongose from "mongoose";
const dbConnection = async()=>{
    
    try {
        
        const dbLink: string = process.env.DB_CNN!;
        await mongose.connect( dbLink);
        
        
    } catch (error) {
        console.log("Error al connectar con la base de datos...")
    }

}

export default dbConnection;