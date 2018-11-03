const express = require('express');
const {PORT, MONGODB_URI} = require('./config/settings');
const passport = require('passport');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const products = require('./routes/product');
const orders = require('./routes/order');
const cart = require('./routes/cart');
const user = require('./routes/user');
const inventory = require('./routes/inventory');
const agent = require('./routes/agent');
const Agent = require('./models/agent');
// const status = require('./routes/status');


const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI);


const app = express();
app.set('port', PORT )

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);

    io.on('connection', function(socket){
        console.log("user connected");
        socket.on('update location', function(agent){
            const lat = agent.lat;
            const long = agent.long;
            const aid = agent.id
            Agent.updateLocation(agent , (err, agent) => {
                if(err)
                    res.json(err)
                res.json(agent);
                res.status(200);
            })
        });
    
        socket.on('get location', (order) => {
            const oid = order.id;
            Agent.getLocation(order, (err, agent) => {
                if(err)
                    res.json(err);
                res.json(agent);
                res.status(200);
            })
        })
    })
})


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
app.use('/api', inventory);
app.use('/api', agent);

