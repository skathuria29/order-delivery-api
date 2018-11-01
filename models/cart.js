const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uid = require('uniqid');

const OrderCartSchema = mongoose.Schema({
    "uid": {
        type :  String
    },
    "product_id" : {
        type : String
    },
    "quantity" : {
        type : Number
    },
    "createdDate" : {
        type : Date
    }

})

let Cart = module.exports = mongoose.model('Cart', OrderCartSchema);

module.exports.getCartItems = function(uid){
    Cart.find({uid : uid},  (err, items) => {  
        if(err)
            return console.error("Couldn't get products")
        return callback(null, items);
    })

}



module.exports.deleteProductFromCart = function(product, callback){
    Cart.deleteOne({ product_id : product.pid}, (err, product) => {
        if(err)
            return console.error("Couldn't delete the product");
        callback(null, product);
    })

}

module.exports.addProductToCart = function(cart, callback){
    let cartItem = new Cart ({
        uid : cart.uid,
        product_id : cart.pid,
        quantity : cart.quantity,
        createdDate : new Date() 
    })

    cartItem.save(callback)

}

module.exports.delete = function(uid , callback){
    Cart.remove({uid : uid} , (err, cart) => {
        if(err)
            return callback(err);
        callback(null, cart);
    })
}




