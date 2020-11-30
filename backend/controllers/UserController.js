import userModel from '../models/userModel.js'
import userCartModel from '../models/userCartModel.js'
export default {

    //TODO: Add validation on the request for all methods
    async index(req,res){
        try {
            const {email} = req.body;
            //TODO: Email Validation
            const user =await userModel.findOne({email})
            if(!user){
                return res.status(204);
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    },
    async find(req,res){
        try {
            //TODO: Adding pagination
            const users = await userModel.find();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    },
    async save(req,res){
        try {
            //TODO: Adding product validation


            console.log(123)
        } catch (error) {
            
        }
    },
    async update(req,res){
        try {
            console.log(123)
        } catch (error) {
            
        }
    },
    async remove(req,res){
        try {
            console.log(123)
        } catch (error) {
            
        }
    },
    async getCart(req,res){
        try{
            const {id} = req.id;
            const user = await userModel.findOne({_id:id})
            if(!user) return res.status(404).json({message: `user with id ${id} doesnot exists!`})
            const userCart = await userCartModel.find({userID:user._id})
            return res.json(user)
        }
        catch(error){

        }
    }
}