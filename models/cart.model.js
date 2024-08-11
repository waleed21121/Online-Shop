const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const cartItem = mongoose.model('cart', cartSchema);

