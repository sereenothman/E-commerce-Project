const Product=require("../models/product.models")
const Order=require("../models/orders.models")

class check{
    static checkout=(req, res) => {
        const userId = req.user.userId; 
        const { products } = req.body; 
      
        Product.find({ _id: { $in: products } })
          .then((selectedProducts) => {
            const totalPrice = selectedProducts.reduce((acc, product) => acc + product.price, 0);
      
            // Create a new order
            const order = new Order({
              user: userId,
              products: selectedProducts.map(product => product._id),
              totalPrice: totalPrice,
            });
      
            return order.save();
          })
          .then((savedOrder) => {
      
            res.json({ message: 'Checkout successful', order: savedOrder });
          })
          .catch((error) => {
            res.status(500).json({ error: 'Failed to process checkout' });
          });
      }
}

module.exports=check