import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  neighborhood: {
    type:String,
    required: true,
  },
  number:{
    type:Number,
    required: true,
  },
  street:{
    type:String,
    required: true,
  }
})


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  cpf:{
    type:String,
    required: false,
    unique:true
  },
  address: [addressSchema]
});

const User = mongoose.model('users', userSchema);

export default  User;
