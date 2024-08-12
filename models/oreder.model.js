const mongoose = require("mongoose");

const cartModel = require("./cart.model");

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number,
    address: String,
    status: {
        type: String,
        default: "pending"
    },
    timestamp: Number
});

const Order = mongoose.model('oreder', orderSchema);

exports.addNewOrder = async (orderData, cartId) => {
    await mongoose.connect(DB_URL);
    try {
        await cartModel.deleteItem(cartId);
        const order = new Order(orderData);
        await order.save();
        await mongoose.disconnect();
    } catch (err) {
        return Promise.reject(err);
    }
};