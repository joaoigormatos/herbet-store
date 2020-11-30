import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await User.insertMany(users);
    await Product.insertMany(products);

    console.log('Dados importados!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Dados excluidos!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
