var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

//hashSync(arg1: what we want to encrypt, arg2: number of salting rounds) =====> means hash asynchronously (one way encrytion by the way)
router.post('/', function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save(function(err, result){
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User Created',
      obj: result
    });
  })
});

module.exports = router;
