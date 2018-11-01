const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Inventory = require('../models/inventory');
const Agent = require('../models/agent');

router.get('/inventory/orders' , (req, res) => {
    Order.getInventoryOrders({} , (err, orders) => {
        if(err)
            res.json(err)
        res.json(orders);
        res.status(200);
    })
})

router.post('/inventory' , (req, res) => {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    Inventory.create({lat : lat, long : long} , (err, inventory) => {
        if(err)
            res.json(err)
        res.json(inventory);
        res.status(200);
    })

    
})

router.get('/inventory/orders/:status' , (req, res) => {
    const status = req.params.status;
    Order.getInventoryOrders({ status : status} , (err, orders) => {
        if(err)
            res.json(err)
        res.json(orders);
        res.status(200);
    })
})

router.put('/inventory/order/ready', (req, res) => {
    const status = 'ready';
    const oid = req.body.oid;
    Order.updateStatus({id : oid , status : status} , (err, order) => {
        if(err)
            res.json(err)
        res.json(order);
        res.status(400);
    })
})

router.post('/inventory/order/assign', (req, res) => {
    const status = 'dispatched';
    const aid = req.body.agent;
    const oid = req.body.order;
    Agent.assignOrder({ aid : aid , oid: oid}, (err, agent) => {
        if(err)
            res.json(err)
        Order.updateStatus({id : oid , status : status} , (err, order) => {
            if(err)
                res.json(err)
            
            res.json(agent);
            res.status(400);
        })
    })
    
})

router.get('/inventory/:iid/location', (req, res) => {
    Inventory.get(req.param.iid, (err, inventory) => {
        if(err)
            res.json(err)
        res.json(inventory);
        res.status(200);
    })
})

module.exports = router;