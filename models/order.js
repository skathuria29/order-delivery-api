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
    }

})

let Order = module.exports = mongoose.model('Order', OrderSchema);