const router = require("express").Router()
const admin = require('../controller/dashboard.controller');
const authenticate = require("../middleware/auth");
const upload=require("../middleware/multer")
const cors=require("cors")


// router.get('', authenticate, admin.home);

router.get('/api/users', authenticate, admin.alluser);

router.get('/products', authenticate,  admin.all);
router.post('/api/products',authenticate,  admin.addproduct)

router.post('/api/products/image', authenticate,  upload.single('image'), admin.addimg);

router.patch('/api/products/:id/update',authenticate,  admin.updateP);

router.get('/api/products/:id',authenticate,  admin.getsingleP);

router.post('/api/products/:id/delete',authenticate,  admin.del);

router.post('/api/products/search',authenticate,  admin.search);

router.get('/api/orders',authenticate,  admin.allOrders);

router.get('/api/orders/:id',authenticate,  admin.orderbyid);

module.exports = router  