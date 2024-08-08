const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

// Schema for the products
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String
});

// model for the products
const product = mongoose.model('product', productSchema);

