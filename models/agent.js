const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Inventory = require('./inventory');

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
   },
   "oid" : {
       type : String
   },
   "iid" : {
       type : String
   }

})


let Agent = module.exports = mongoose.model('Agent', AgentSchema);

module.exports.getAgents = function(filters, callback){
    Agent.find(filters, (err, agents) => {
        if(err)
            return callback(err);
        callback(null, agents);
    })
}



module.exports.updateLocation = function(agent, callback){
    Agent.findOneAndUpdate(agent.id , {latitude : agent.lat , longitude : agent.long} , (err, agent) => {
        if(err)
            return callback(err)
        callback(null, agent);
    })
}

module.exports.getLocation = function(oid, callback){
    Agent.findOne(oid , (err, agent) => {
        if(err)
            return callback(err);
        callback(null, { latitude : agent.latitude , longitude : agent.longitude});
    })
}

module.exports.getAgentDetails = function(aid, callback){
    Agent.findOne({aid : aid } , (err, agent) => {
        if(err)
            return callback(err);
        callback(null, agent);
    })

}

module.exports.addAgent = function(agent, callback){
    let new_agent = new Agent({
        aid : agent.aid,
        name : agent.name,
        contact_number : agent.contact_number,
        iid : agent.iid
    })

    Inventory.get(new_agent.iid , (err, inv) => {
        if(err)
            callback(err)
        new_agent.latitude = inv.latitude; 
        new_agent.longitude = inv.longitude;
        new_agent.save(callback);
    })

   
}

module.exports.assignOrder = function(agent, callback){
    Agent.findOneAndUpdate(agent.aid , { oid : agent.oid} , (err, agent) => {
        if(err)
            return callback(err);
        callback(null, agent);
    })
}


