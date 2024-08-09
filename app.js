const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path : 'config.env'});

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session); //constructor

const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('view engine', 'ejs');
app.set('views', 'views');

const STORE = new SessionStore({
    uri: 'mongodb://127.0.0.1:27017/online-shop',
    collection: 'sessions'
});

app.use(session({
    secret: 'waleed seif sherbiny Eyad eYAD SaleH .......',
    saveUninitialized: false,
    store: STORE
}));

// Home page details
app.get('/', homeRouter);

// Product page details
app.use('/product', productRouter);

// sign up page details
app.use('/', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    console.log(`server listening on port ${PORT}`);
})