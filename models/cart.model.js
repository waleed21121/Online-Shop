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

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = async (data) => {
    await mongoose.connect(DB_URL);
    const sameItem = await CartItem.findOne({productId: data.productId, userId: data.userId});
    if(sameItem) {
        const amount = +data.amount + sameItem.amount;
        data.amount = amount;
        await CartItem.deleteOne({_id: sameItem._id});
    }
    try {
        const item = new CartItem(data);
        await item.save();
    } catch (err) {
        mongoose.disconnect();
        return Promise.reject(err);
    }
}

exports.getItemByUserId = async (id) => {
    await mongoose.connect(DB_URL);
    try {
        const userItems = await CartItem.find({userId: id}).sort({timestamp: -1});
        mongoose.disconnect();
        return userItems;
    } catch (err) {
        mongoose.disconnect();
        return Promise.reject(err);
    }
}

exports.editItem = async (id, newData) => {
    await mongoose.connect(DB_URL);
    try {
        await CartItem.updateOne({ _id: id }, { $set: newData });
        mongoose.disconnect();
    } catch (err) {
        mongoose.disconnect();
        return Promise.reject(err);
    }
};

exports.deleteItem = async (id) => {
    await mongoose.connect(DB_URL);
    try {
        await CartItem.deleteOne({ _id: id });
        mongoose.disconnect();
    } catch (err) {
        mongoose.disconnect();
        return Promise.reject(err);
    }
};

exports.deleteAllCartItems = async (id) => {
    await mongoose.connect(DB_URL);
    try {
        await CartItem.deleteMany({ userId: id});
        mongoose.disconnect();
    } catch (err) {
        mongoose.disconnect();
        return Promise.reject(err);
    }
};

exports.getItemById = async (id) => {
    await mongoose.connect(DB_URL);
    try {
        const item = await CartItem.find({ _id: id});
        mongoose.disconnect();
        return item;
    } catch (err) {
        mongoose.disconnect();
        return Promise.reject(err);
    }
};