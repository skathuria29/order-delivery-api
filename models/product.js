const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    "pid": {
        type :  String
    },
    "productName" : {
        type : String
    },
    "quantity" : {
        type : Number
    },
    "price" : {
        type : Number
    }
})

let Product = module.exports = mongoose.model('Product', ProductSchema);