import productModel from '../models/productModel.js'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config();
const host_url = process.env.SERVER_HOST
import QR from 'qr-image'

console.log(host_url)
export default {
    async index(req,res){
        try {
            const {id} =req.params
            //TODO: Add id validation
            const product = await productModel.findOne({_id:id})
            if(!product) return res.status(404).json({message: `product with id ${id} has not been found`})
            product.image = host_url+product.image
            return res.json(product)
        } catch (error) {
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })

        }
    },
    async qrcode(req,res){
        try{
            const {id} = req.params
            if(!id || typeof id === 'undefined' || id === ' ')
                return res.status(401).json({message: 'Invalid ID'});
            const product = await productModel.findOne({_id: id})
            if(!product) return res.status(404).json('Product not found')
          
                const qr_png = QR.image(`http://localhost:3000/product/${id}`,{type: 'png'})
                res.setHeader('Content-type','image/png')
              
               return qr_png.pipe(res)   
        }
        catch(error){
            console.log(error)
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })

        }
    },
    async find(req,res){
        try {
            //TODO: Adding pagination
            console.log("Hi there");
            const products = await productModel.find();
            products.forEach(product=>product.image = host_url+product.image)
            return res.json(products);
        } catch (error) {
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    },
    async save(req,res){
        try {
            const {name,brand,category,description} = req.body;
            const filePath = `/uploads/${req.file.filename}`;
            const product = await productModel.create({name,brand,category,image:filePath,description})
            await product.save()
            return res.status(201).json({message: 'product created!'})
            } catch (error) {
                console.log(error)
             return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    },
    async update(req,res){
        try {
            
        } catch (error) {
            
        }
    },
    async remove(req,res){
        try {
            const {id} = req.params
            const product = await productModel.findOne({_id:id})
            if(!product) return res.status(404).json({message: `product with id ${id} cannot been deleted!`})
            await productModel.deleteOne({_id: id})
            fs.unlinkSync(path.join(fs.realpathSync('.'),product.image))
            return res.json({message: `product with ${id} has been delete`})

        } catch (error) {
            console.log(error)
            return res.status(500).json({path: req.path, message: 'Server error', method: req.method })
        }
    }
}