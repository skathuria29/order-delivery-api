const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uid = require('uniqid');

const ProductSchema = mongoose.Schema({
    "pid": {
        type :  String
    },
    "productName" : {
        type : String
    },
    "description":{
        type : String
    },
    "quantity" : {
        type : Number,
        required : true
    },
    "price" : {
        type : Number
    }
})

let Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProducts = function(filters, callback){
    Product.find(filters, (err, products) => {  
        if(err)
            return console.error("Couldn't get products")
        return callback(null, products);
    })
}

module.exports.getProductInfo = function(pid, callback){
    Product.find({pid : pid} , (err, product) =>{
        if(err)
            return console.error("Couldn't find the product");
        callback(null, product);
    })
}




module.exports.addProduct = function(product , callback){
    var _product = new Product({
        pid : 'pro_' + uid(),
        productName : product.pname,
        quantity : product.quantity,
        price : product.price
    })
    _product.save(callback);
}



