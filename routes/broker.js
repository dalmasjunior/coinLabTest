var express = require('express');
var router = new express.Router();

router.get('/', (req, res, next) => {
    res.send('Express API');
});

module.exports = router;