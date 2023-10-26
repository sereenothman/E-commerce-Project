const Product = require("../models/product.models")

class cart {
    static allcart = (req, res) => {
        const userId = req.user.userId;
        Order.findOne({ user: userId })
            .populate('products')
            .then((order) => {
                if (!order) {
                    res.json({ cart: [] });
                } else {
                    res.json({ cart: order.products });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to retrieve shopping cart' });
            });
    };
    static addtocart = (req, res) => {
        const userId = req.user.userId;
        const productId = req.body.productId;
        Product.findById(productId)
            .then((product) => {
                if (!product) {
                    res.status(404).json({ error: 'Product not found' });
                } else {
                    return Order.findOneAndUpdate(
                        { user: userId },
                        { $push: { products: productId } },
                        { upsert: true, new: true }
                    );
                }
            })
            .then(() => {
                res.json({ message: 'Product added to cart' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to add product to cart' });
            });
    };

    static del = (req, res) => {
        const userId = req.user.userId;
        const productId = req.params.id;
        Order.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        )
            .then(() => {
                res.json({ message: 'Product removed from cart' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to remove product from cart' });
            });
    };
}

module.exports = cart