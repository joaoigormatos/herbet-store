import userCartModel from '../models/userCartModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
export default {
    async index(req,res){
        try {

        } catch (error) {
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })

        }
    },
    async find(req,res){
        try {
            console.log(123)
        } catch (error) {
            
        }
    },
    async save(req,res){
        try {
            const {id}  = req.params
            const {productId, name ,quantity}  =req.body            
            const validUser = await userModel.findOne({_id:id})
            if(!validUser) return res.status(400).json({message:  `user with id ${id} doesnot exists`})
            const validProduct = await productModel.findOne({_id:id})
            if(!validProduct) return res.status(400).json({message: `product with id ${id} doesnot exists`})
            if(validProduct.quantity < quantity) return res.status(400).json({message: `the quantity informed exceeds the product's quantity`})
            let userCart = await userCartModel.findOne({userId: id})

            if(userCart) {
                userCart.products.push({idProduct: productId, quantity, name})
                await userCart.save();
                return res.json({message: `${name} added to the user's cart`});
            }
            userCart = await userCartModel.create({userId: id,name: validUser.name, products:[{idProduct:productId, name, quantity}]})
            await userCart.save()
            return res.json({message: `${name} added to the user's cart`});
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
    }
}