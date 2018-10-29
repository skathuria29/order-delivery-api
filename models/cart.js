const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderCartSchema = mongoose.Schema({
    "cid": {
        type :  String
    },
    "items" : {
        type : Array
    },
    "uid" : {
        type : String
    }

})

let Cart = module.exports = mongoose.model('Cart', OrderCartSchema);

module.exports.getCartItems = function(){

}

module.exports.addProductToCart = function(pid){
    

}

module.exports.deleteProductFromCart = function(){

}




