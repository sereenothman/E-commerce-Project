const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
},
{timestamps:true}
);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order
