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
});

const Order = mongoose.model('oreder', orderSchema);

exports.addNewOrder = async (orderData, cartId) => {
    try {
        await cartModel.deleteItem(cartId);
        await mongoose.connect(DB_URL);
        const order = new Order(orderData);
        await order.save();
        await mongoose.disconnect();
    } catch (err) {
        return Promise.reject(err);
    }
};

exports.getOrdersByUser = async (id) => {
    await mongoose.connect(DB_URL);
    try {
        const orders = await Order.find({userId: id});
        await mongoose.disconnect();
        return orders;
    } catch (err) {
        return Promise.reject(err);
    }
};

exports.cancelOrder = async (id) => {
    await mongoose.connect(DB_URL);
    try {
        await Order.findByIdAndDelete(id);
        await mongoose.disconnect();
    } catch (err) {
        return Promise.reject(err);
    }
};

exports.getAllOrders = async () => {
    await mongoose.connect(DB_URL);
    try {
        const orders = await Order.find({});
        await mongoose.disconnect();
        return orders;
    } catch (err) {
        return Promise.reject(err);
    }
};