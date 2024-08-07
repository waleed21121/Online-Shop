const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path : 'config.env'});
const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) => {
    res.render('index.ejs');
})

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    console.log(`server listening on port ${PORT}`);
})