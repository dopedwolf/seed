var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});
//^ ref allows you to reference to another mongoose model

//gives us extra validation for 'unique' email
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
