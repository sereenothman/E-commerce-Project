const product = require("../controller/product.controller")
const router = require("express").Router()
const cors=require("cors")


router.get('/api/products/:id',cors(), product.productdetails);

// listing
router.get('/api/products',cors(), product.productlist);
module.exports=router
