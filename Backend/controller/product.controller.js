const Product=require("../models/product.models")



class products{
    static productdetails=(req, res) => {
        const productId = req.params.id;
        Product.findById(productId)
            .then((product) => {
                if (!product) {
                    res.status(404).json({ error: 'Product not found' });
                } else {
                    res.json({ product });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to retrieve product details' });
            });
    
        res.json({ product: {} });
    }

    static productlist=(req, res) => {
        Product.find()
            .then((products) => {
                res.json({ products });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to retrieve products' });
            });
    
        res.json({ products: [] });
    }
}

module.exports=products