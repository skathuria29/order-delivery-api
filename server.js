const express = require('express');
const {PORT, MONGO_URL} = require('./config/settings');
const products = require('./routes/product');
const orders = require('./routes/order');
// const cart = require('./routes/cart');
// const status = require('./routes/status');

const app = express();

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