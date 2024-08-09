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
    let users = await User.find({email : email});
    let hashPassword;
    if(users.length === 0) {
        hashPassword = await bcrypt.hash(password, 10);
    }
    else {

        // Disconnect from DB
        await mongoose.disconnect();

        return Promise.reject('This Email already have an account');
    }

    // User with ecrypted password
    let newUser = new User({
        username: username,
        email: email,
        password: hashPassword
    });

    // Create new user 
    await newUser.save();
    
    // Disconnect from DB
    await mongoose.disconnect();

}

exports.login = async (email, password) => {

    // Connect to DB
    await mongoose.connect(DB_URL);

    // Check if email exists
    let user = await User.findOne({email : email});
    let userExist;

    //Disconnect fron DB
    await mongoose.disconnect();

    if(!user) {
        return Promise.reject('There is no user matches this email');
    }
    else {
        userExist = await bcrypt.compare(password, user.password);
    }

    if(!userExist) {
        return Promise.reject('The password is incorrect');
    } else  {
        return user._id;
    }    
}