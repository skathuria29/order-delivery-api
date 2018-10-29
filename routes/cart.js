const express = require('express');
const router = express.Router();

router.get('/cart' , (req,res) => {
    res.send("get cart items");
})

module.exports = router;