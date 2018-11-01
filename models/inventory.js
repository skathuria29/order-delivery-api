const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uniqid');

const InventorySchema = mongoose.Schema({
    "id": {
        type :  String
    },
   "latitude" : {
       type : String
   },
   "longitude" :{
       type : String
   }

})

let Inventory = module.exports = mongoose.model('Inventory', InventorySchema);

module.exports.create = function(inventory, callback){
    let new_inv = new Inventory({
        id : uuid(),
        latitude : inventory.lat,
        longitude : inventory.long
    })

    new_inv.save(callback);
}

module.exports.get = function(id, callback){
    Inventory.findOne({id : id}, (err, inventory) => {
        if(err)
            return callback(err);
        callback(null, inventory);
    })
}