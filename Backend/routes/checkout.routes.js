const check = require("../controller/check.controller")
const router = require("express").Router()
const cors=require("cors")
router.use(cors())


router.post('/api/checkout', check.checkout); 

module.exports=router
