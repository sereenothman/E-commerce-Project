const Product=require("../models/product.models")
const Order=require("../models/orders.models")
const User=require("../models/users.models")


class admin{

    static alluser=(req, res) => {
      User.find()
        .then((users) => {
          res.json(users);
        })
        .catch((err) => {
          console.error('Failed to fetch users', err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    }
    static home=(req, res) => {
        Product.find()
            .then((products) => {
                res.json({ products });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to retrieve products' });
            });
    
    }

    static addproduct=(req, res) => {
      const { name, price, description } = req.body;
      // Create a new product and save it to the database
      const product = new Product({ name, price, description });
      product
        .save()
        .then((savedProduct) => {
          res.json({ message: 'Product created', product: savedProduct });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to create product' });
        });
    }

    static addimg=(req, res) => {
      const productId = req.body.productId;
      const image = req.file;
    
      if (!productId || !image) {
        return res.status(400).json({ error: 'Missing productId or image file' });
      }
      Product.findByIdAndUpdate(
        productId,
        { imageUrl: image.filename },
        { new: true }
      )
        .then((updatedProduct) => {
          if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.json({ message: 'Image uploaded successfully', product: updatedProduct });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to upload image' });
        });
    }

    static all=(req, res) => {
        Product.find()
          .then((products) => {
            res.json( { products });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      } 
      
    static updateP=(req, res) => {
        const productId = req.params.id;
        const updatedData = req.body;
      
        Product.findByIdAndUpdate(productId, updatedData)
          .then(() => {
            res.redirect(`/dashboard/products/${productId}`);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      }  

    static getsingleP=(req, res) => {
        const productId = req.params.id;
      
        Product.findById(productId)
          .then((product) => {
            res.render('dashboard/productDetails', { product });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      } 
      
     static del=(req, res) => {
        const productId = req.params.id;
      
        Product.findByIdAndDelete(productId)
          .then(() => {
            res.redirect('/dashboard/products');
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      } 

      static search=(req, res) => {
        const searchTerm = req.body.searchTerm;
      
        Product.find({ name: { $regex: searchTerm, $options: 'i' } })
          .then((products) => {
            res.render('dashboard/productSearchResults', { products, searchTerm });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      }

      static allOrders=(req, res) => {
        Order.find()
          .then((orders) => {
            res.render('dashboard/orders', { orders });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
    
        }

       static orderbyid=(req, res) => {
        const orderId = req.params.id;
      
        Order.findById(orderId)
          .then((order) => {
            res.render('dashboard/orderDetails', { order });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      } 


     
}

module.exports=admin