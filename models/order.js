const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    "oid": {
        type :  String
    },
    "items" : {
        type : Array
    },
    "uid" : {
        type : String
    },
    "status":{
        type : String,
        enum : ["placed" , "ready to dispatch" , "agent assigned" , "dispatched" , "received"],
        default : "placed"
    }

})

let Order = module.exports = mongoose.model('Order', OrderSchema);

//all orders for inventory
module.exports.getAllOrders = function(){

}


//get user specific orders
module.exports.getOrders = function(){

}

//order -> add status to order
module.exports.placeOrder = function(){

}

module.exports.orderReadyToDispatch = function(){

    //send notofication to agents in vicinity
}



