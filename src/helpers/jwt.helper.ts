import jwt from 'jsonwebtoken';

export const generateJWT = async(uid:any)=>{
    return new Promise((resolve, reject) => {
        //Los datos que va contener el JWT
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY!, {
            expiresIn:'4h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('Error al generar el jwt')
            }else{
                resolve(token)
            }
        })

    })
}