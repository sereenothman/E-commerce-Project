const users = require("../controller/users.controller")
const router = require("express").Router()
const cors=require("cors")

router.post('/api/login',cors(), users.login);
router.post('/api/register',cors(), users.register);
router.post('/api/logout',cors(), users.logout);


module.exports=router