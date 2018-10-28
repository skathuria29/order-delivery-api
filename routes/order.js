const express = require('express');
const router = express.Router();

router.get('/orders' , (req,res) => {
    res.send("get orders");
})

module.exports = router;