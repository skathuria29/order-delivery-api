const express = require('express');
const router = express.Router();
const Agent = require('../models/agent');
const uuid = require('uniqid');
const {PORT} = require('../config/settings');



router.get('/agents' , (req, res) => {
    Agent.getAgents({} , (err, agents) => {
        if(err)
            res.json(err)
        res.json(agents);
        res.status(200);
    })
})

router.get('/agent/:aid/location', (req, res) => {
    Agent.getAgentLocation(req.param.aid, (err, resp) => {
        if(err)
            res.json(err);
        res.json(resp);
        res.status(200);
    })
})

// router.post('/agent/:aid/location', (req, res) => {
//     const lat = req.body.lat;
//     const long = req.body.long;

//     req.checkBody('lat', 'Latitude is required').notEmpty().isNumeric();
// 	req.checkBody('long', 'Longitude is not valid').notEmpty().isNumeric();

//     var errors = req.validationErrors();
    
// 	if (errors) {
// 		res.status(400).json({ errors: errors });
//     }
//     else{

//         Agent.setAgentLocation({id : req.param.aid , lat : lat, long : long}, (err, resp) => {
//             if(err)
//                 res.json(err);
//             res.json(resp);
//             res.status(200);
//         })
//     }
    
  
// })

//add an agent
router.post('/agent', (req, res) => {
    const name = req.body.name;
    const contact_number = req.body.contact_number;
    const inventory = req.body.inventory
    
    req.checkBody('name', 'Username is required').notEmpty();
	req.checkBody('contact_number', 'Contact Number is not valid').isNumeric();

    var errors = req.validationErrors();
    
	if (errors) {
		res.status(400).json({ errors: errors });
    }
    else{
        let new_agent = {
            aid : "agent_" + uuid(),
            name : name,
            contact_number : contact_number,
            iid : inventory
        }

        Agent.addAgent(new_agent , (err, agent) => {
            if(err)
                res.json(err);
            res.json(agent);
            res.status(200);
        })
    }
})


module.exports = router;