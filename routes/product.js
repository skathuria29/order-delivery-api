const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { check } = require('express-validator/check')


//get products
router.get('/products' , (req,res) => {
    Product.getProducts({}, (err, products) => {
        if(err)
            res.json(err);
        res.json(products);
        res.status(200);
    })
})

//add product
router.post('/products' , (req, res) => {
    const pname = req.body.pname;
    const quantity = req.body.quantity;
    const price = req.body.price;

    check('quantity').isNumeric()
    check('price').isNumeric()

    let new_product = {
        pname : pname,
        quantity : quantity,
        price : price
    }
    Product.addProduct(new_product, (err, product) =>{
        if(err)
            res.json(err)
        res.json(product)
        res.status(200);
    })
})

module.exports = router;