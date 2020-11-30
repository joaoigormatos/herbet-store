import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.SECRET;
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'


export const generateToken = (payload)=>{
    return jwt.sign({id: payload},secret,{expiresIn: '3m'})
};
export const checkHeaderToken = (req,res,next)=>{
    const header = req.headers['authorization'];
    if(typeof header === 'undefined'|| header === 'undefined')
    {
        return res.status(403).json({message: "Missing header"})
    }
    const bearer = header.split(' ')
    const token = bearer[1]

    if(token === 'undefined' || typeof token === 'undefined'){
        console.log("Token is undefined");
        return res.status(401).json({message:'Please send a valid token'})
    }
        
    req.token = token
    next();
}
export const refreshTokenCheck = (req,res,next)=>{
    const {token} = req

    if(!token || typeof token === 'undefined') return res.status(401).json({message:"Token is missing!!"})

}


export const checkAuthorization = async (req,res,next)=>{
    const {token} = req

    if(!token || typeof token === 'undefined') return res.status(401).json({message:"Token is missing!!"})
    try{
        const decodedPayload = await jwt.verify(token,secret)
 
        const {id} = decodedPayload;
        if(typeof id === 'undefined')
            return res.status(403).json({message: 'invalid token'})
        const user = await userModel.findById(id)
        if(user.isAdmin)
            next()
        return res.status(403).json({message: 'forbidden action'})
    }
    catch(error){
        console.log(error)
        return  res.status(403).json({message: error})
    }

}