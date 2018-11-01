const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');

router.post('/orders' , (req,res) => {
    const uid = req.body.user_id;
    Order.getUserOrders({id : uid}, (err, orders) => {
        if(err)
            res.json(err);
        res.json(orders);
        res.status(200);
    })
})

router.get('/order/:oid' , (req, res) => {
    Order.getOrderDetails(req.params.oid, (err, items) => {
        if(err)
            res.json(err)
        res.json(items)
        res.status(400);
    })
})

router.post('/order', (req, res) => {
    const uid = req.body.uid;

    req.checkBody('uid', 'User is required').notEmpty();
    var errors = req.validationErrors();
    
	if (errors) {
		res.status(400).json({ errors: errors.mapped() });
    }
    else{
        Order.placeOrder(uid , (err, order) => {
            if(err)
                res.json(err).status(400);
            //when order has been placed clear cart
            Cart.delete(uid, (err, cart) => {
                if(err)
                    res.json(err).status(400);
                res.json(order);
                res.status(400);
            })
           
        })
    }
})

module.exports = router;