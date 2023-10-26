const cart = require("../controller/cart.controller")
const router = require("express").Router()
const cors=require("cors")


router.get('/api/cart',cors(), cart.allcart);
router.post('/api/cart',cors(), cart.addtocart);
router.delete('/api/cart/:id',cors(), cart.del);

module.exports=router

