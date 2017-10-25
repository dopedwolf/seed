var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/messages');
var jwt = require('jsonwebtoken');

//adding .exec() executes all methods like .find()
router.get('/', function(req, res, next){
  Message.find()
      .exec(function(err, messages){
        if (err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        res.status(200).json({
          message: 'Success',
          obj: messages
        })
      });
});

//on each request this method is reached
router.use('/', function(req, res, next) {
  //allows to check if incoming token is valid
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if(err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      })
    }
    next();
  })
});

router.post('/', function (req, res, next) {
  //decoded token using the user: user in payload when token was created
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var message = new Message({
      content: req.body.content,
      user: user._id
    });
    message.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      //pushes newly created message to array of messages in user model
      user.messages.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved Message',
        obj: result
      });
    })
  })
});

//patch is commonly used to change existing data (put() is an alternative)
router.patch("/:id", function(req, res, next){
  Message.findById(req.params.id, function(err, message){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!message) {
      return res.status(500).json({
        title: 'No Message Found',
        error: {message: 'Message not found'}
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated Message',
        obj: result
      });
    })
  })
});

router.delete("/:id", function(req, res, next){
  Message.findById(req.params.id, function(err, message){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!message) {
      return res.status(500).json({
        title: 'No Message Found',
        error: {message: 'Message not found'}
      });
    }
    message.remove(function(err, result) {
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Removed Message',
        obj: result
      });
    })
  })
});

module.exports = router;
