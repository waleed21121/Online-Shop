const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path : 'config.env'});

const homeRouter = require('./routes/home.route');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Home page details
app.get('/', homeRouter);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    console.log(`server listening on port ${PORT}`);
})