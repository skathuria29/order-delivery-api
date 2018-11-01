const express = require('express');
const {PORT, MONGODB_URI} = require('./config/settings');
const passport = require('passport');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const products = require('./routes/product');
const orders = require('./routes/order');
const cart = require('./routes/cart');
const user = require('./routes/user');
// const status = require('./routes/status');

const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI);

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport init
app.use(passport.initialize());
app.use(passport.session());



// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

app.use('/api', products);
app.use('/api', orders);
app.use('/api', cart);
app.use('/api', user);


// app.use('/', (req,res) => {
//     res.send("hello world!");
// })

app.listen(PORT, (err) =>{
    if(err)
        console.log(`PORT ${PORT} already in use`);
    else 
        console.log(`Server running on port ${PORT}`);
})