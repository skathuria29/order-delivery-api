const express = require('express');
const router = express.Router();
const uuid = require('uniqid');
const Cart = require('../models/cart');
const { check , validationResult } = require('express-validator/check')

router.get('/cart/:uid' , (req,res) => {
    Cart.find({uid : req.params.uid} , (err, items) => {
        if(err)
            res.status(400).json(err);
        res.json(items);
        res.status(200);
    })
})

router.post('/addToCart' , (req,res) => {
    const pid = req.body.pid;
    const uid = req.body.uid;
    const quantity = req.body.quantity;

    // req.checkBody(pid).notEmpty();
    // req.checkBody(uid).notEmpty();
    // req.checkBody(quantity).notEmpty().isNumeric();

    check('pid').not().isEmpty();
    check('uid').not().isEmpty()
    check('quantity').isNumeric()

    let errors = validationResult(req);
    // let errors = req.validationErrors();

	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.mapped() });
    }
    else{

        let cart = {
            cid : uuid(),
            pid : pid,
            uid : uid,
            quantity : quantity,
            createdDate : new Date()
        }

        Cart.addProductToCart(cart, (err, product) => {
            if(err)
                res.json(err)
            res.json(product)
            res.status(200);
        })
    }
})


module.exports = router;