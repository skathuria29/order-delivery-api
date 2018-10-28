const express = require('express');
const {PORT, MONGODB_URI} = require('./config/settings');
const bodyParser = require('body-parser');
const products = require('./routes/product');
const orders = require('./routes/order');
// const cart = require('./routes/cart');
// const status = require('./routes/status');

const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI);

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', products);
app.use('/api', orders);

// app.use('/', (req,res) => {
//     res.send("hello world!");
// })

app.listen(PORT, (err) =>{
    if(err)
        console.log(`PORT ${PORT} already in use`);
    else 
        console.log(`Server running on port ${PORT}`);
})