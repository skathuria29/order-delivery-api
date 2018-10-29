const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = mongoose.Schema({
    "aid": {
        type :  String
    },
    "name" : {
        type : String
    },
    "contact_number" : {
        type : Number
    },
   "latitude" : {
       type : String
   },
   "longitude" :{
       type : String
   }

})

let Agent = module.exports = mongoose.model('Agent', AgentSchema);

module.exports.getCurrentLocation = function(){

}

module.exports.getAgentInfo = function(){

}

module.exports.addAgent = function(){
    
}
