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

