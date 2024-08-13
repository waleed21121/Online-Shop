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
const Product = mongoose.model('product', productSchema);

// Get all products from database
exports.getAllProducts = async() => {

    // Connect to DB
    await mongoose.connect(DB_URL);

    let products = await Product.find({});

    // Disconnect from DB
    await mongoose.disconnect();

    return products;
}

exports.getProductsByCategories = async(category) => {

    await mongoose.connect(DB_URL);

    let products = await Product.find({category: category});

    await mongoose.disconnect();

    return products;
}

exports.getProductById = async(id) => {

    await mongoose.connect(DB_URL);

    let product = await Product.findById(id);

    await mongoose.disconnect();

    return product;
}

exports.getFirstProduct = async() => {

    await mongoose.connect(DB_URL);

    let product = await Product.findOne({});

    await mongoose.disconnect();

    return product;
}

exports.addNewProduct = async(data) => {

    await mongoose.connect(DB_URL);

    const product = new Product(data);

    await product.save();

    await mongoose.disconnect();

    return product;
}