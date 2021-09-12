import User from "../models/user.model";


export const emailExist = async( email:string ) => {

    // Verificar si el correo existe
    const existeEmail = await User.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}