require("dotenv").config()
const cors=require("cors")
const express = require('express');
const session = require('express-session');
const app = express()
app.use(cors())
app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")

const userroute=require('./routes/auth.routes')
const cartroute=require('./routes/cart.routes')
const checkoutroute=require('./routes/checkout.routes')
const productroute=require('./routes/product.routes')
const dashboardRoutes = require('./routes/dashboard.routes');

app.use(
    session({
      secret: 'mysecret',
      resave: false,
      saveUninitialized: false,
    })
  );
app.use('/user',userroute)
app.use('/admin',dashboardRoutes)

// app.use("/",router)

app.all('*',(req,res)=>{
    res.status(400).json({message:"this resource is not available"})
})

app.listen(3002,()=>{
    console.log("http://localhost:3002");
})    
    