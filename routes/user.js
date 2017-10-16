var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

//401 ===> unauthorized
//bcrypt.compareSync(arg1: password inputed, arg2: password in database)
router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login Failed',
        error: {message: 'Invalid Login Credentials'}
      });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login Failed',
        error: {message: 'Invalid Login Credentials'}
      });
    }
    // V user retrieved above ^
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Succesfully Logged In',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
