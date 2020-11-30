
import express from 'express';

const destination = process.env.UPLOADS_LOCATION;
console.log(destination)
import connectDB from './config/db.js';

import dotenv from 'dotenv'
dotenv.config()


import colors from 'colors'
import helmet from 'helmet'
import router from './routes.js'



connectDB();

const app = express();
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'API está funcionando!', data: 'oi' });
});

app.get('/qrcode',(req,res)=>{  
  const qr_png = QR.image('http://www.google.com',{type: 'png'})
  res.setHeader('Content-type','image/png')

  qr_png.pipe(res)
})

app.use(router)

export default app;