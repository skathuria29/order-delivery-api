const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uniqid');
const Cart = require('./cart');

const OrderSchema = mongoose.Schema({
    "id": {
        type :  String
    },
    "uid" : {
        type : String
    },
    "delivery_address" : {
        "latitude" : {
            type : Number
        },
        "longitude" : {
            type : Number
        }
    },  
    "status":{
        type : String,
        enum : ["placed" , "ready" , "dispatched" , "received"],
        default : "placed"
    },
    "createdAt" : {
        type : Date
    }

})

const OrderItemSchema = mongoose.Schema({
    "oid" : {
        type : String
    },
    "product_id" : {
        type : String
    },
    "quantity" : {
        type : Number,
        required : true,
        minimum : 1
    }
})

let Order = module.exports = mongoose.model('Order', OrderSchema);
let OrderItem = module.exports = mongoose.model('OrderItem', OrderItemSchema);

//get user specific orders
module.exports.getUserOrders = function(user, callback){
    Order.find({uid : user.id} , (err, orders) => {
        if(err)
            return console.log(err)
        callback(null, orders);
    })
}

module.exports.getOrderDetails = function(oid, callback){
    Order.findOne({id : oid} , (err, order) => {
        if(err)
            return callback(err)
        OrderItem.find({oid : order.id}, (err, items) => {
            if(err)
                return callback(err)
            callback(null, items);
        })
    })
}


//all orders for inventory
module.exports.getInventoryOrders = function(filters , callback){
    Order.find(filters, ['id' , 'createdAt', 'status'], (err, orders) => {
        if(err)
            return callback(err);
        callback(null, orders);
    })
}

let createOrder = function(uid, callback){
    let new_order = new Order({
        id : 'order_' + uuid(),
        uid : uid,
        createdAt : new Date()
    })
    
    new_order.save(callback);
}

module.exports.placeOrder = function(uid, callback){
    Cart.find({uid : uid} , (err, items) => {
        if(err)
            return callback(err);
        createOrder(uid, (err, order) => {
            let orderItems = [];
            for(let each of items){
                let temp = {}
                temp['oid'] = order.id;
                temp['product_id'] = each.product_id;
                temp['quantity'] = each.quantity;

                orderItems.push(temp);
            }

            OrderItem.create(orderItems, (err , resp) => {
                if(err)
                    return callback(err);
                callback(null, resp);
            })
        })
    })
}

module.exports.updateStatus = function(order, callback){
    Order.findOneAndUpdate(order.id, { status : order.status} , (err, order) => {
        if(err)
            return callback(err);
        callback(null, order);
    })
}



