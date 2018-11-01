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
    "status":{
        type : String,
        enum : ["placed" , "ready to dispatch" , "agent assigned" , "dispatched" , "received"],
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


//all orders for inventory
module.exports.getInventoryOrders = function(filters , callback){
    Order.find(filters, (err, orders) => {
        if(err)
            return callback(err);
        callback(null, orders);
    })
}

//order -> add status to order
// module.exports.placeOrder = function(uid){
//     Order.create()
// }

module.exports.orderReadyToDispatch = function(){
}

let createOrder = function(uid, callback){
    let new_order = new Order({
        id : 'order_' + uuid(),
        uid : uid,
        createdAt : new Date()
    })
    
    new_order.save(callback);
}

// module.exports.createOrderItem = function(){

// }

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



