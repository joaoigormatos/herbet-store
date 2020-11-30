import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../util/jwtHandler.js'
export default {
    async login(req,res){
        try {
            const {email,password} = req.body
            if(!email || !password) return res.status(400).json({'message':'password or email invalid'})
            const checkUserExits = await userModel.findOne({email})
            if(!checkUserExits) return res.status(400).json({message: 'wrong email or password '})  
            const matchedPassword = await bcrypt.compare(password, checkUserExits.password)
            if(!matchedPassword) return res.status(400).json({message: 'wrong email or password'})
            const token = generateToken(checkUserExits._id)
            return res.json({token})
        } catch (error) {
            console.log(error);
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    },
    async singup(req,res){
        try {
            //Add validations
            const {name,email,password,cpf,address} = req.body
            const checkUserExits = await userModel.findOne({email})
            if(checkUserExits) return res.status(403).json({message: 'User already exists'})
            const bcryptSalt = 12
            const hashedPassword = await bcrypt.hash(password,bcryptSalt);
            const newUser = await userModel.create({name,email,password: hashedPassword,cpf,address});
            await newUser.save()
            return res.status(201).json({message: 'User created successfully'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    },
    async logout(req,res){
        return res.json({token: null})
    }

}