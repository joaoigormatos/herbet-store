import mongoose from 'mongoose';

const productRef = mongoose.Schema(
  {
    idProduct: { type: String, required: true },
    name:{type:String,required:true},
    quantity:{type:Number,required:true,default:0}
  },
  { timestamps: true }
);

const userCart = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId:{
      type:String,
      required: true
    },
    products: [productRef],
  },
  {
    timestamps: true,
  }
);

const UserCart = mongoose.model('userCart', userCart);

export default UserCart;
