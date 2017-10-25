var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});
//^ ref allows you to reference to another mongoose model

//schema.post() ====> do it after a certain action happens: ('remove')
//this makes sure when a message is deleted it is also removed from user array of messages
schema.post('remove', function(message){
  User.findById(message.user, function(err, user){
    user.messages.pull(message._id);
    user.save();
  });
});

module.exports = mongoose.model('Message', schema);
