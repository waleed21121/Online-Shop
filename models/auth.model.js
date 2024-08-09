const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

// Schema for the users
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('user', userSchema);

exports.createNewUser = async (username, email, password) => {

    // Connect to DB
    await mongoose.connect(DB_URL);

    // Check if email exists
    let users = User.find({email : email});
    let hashPassword;
    if(!users) {
        hashPassword = await bcrypt.hash(password, 10);
    }
    else {

        // Disconnect from DB
        await mongoose.disconnect();

        throw new Error('This Email already have an account');
    }

    // User with ecrypted password
    let newUser = new User({
        username: username,
        email: email,
        password: hashPassword
    });

    // Disconnect from DB
    await mongoose.disconnect();

    // Create new user 
    newUser.save();
}