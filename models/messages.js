var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});
//^ ref allows you to reference to another mongoose model

module.exports = mongoose.model('Message', schema);
