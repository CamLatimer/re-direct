var mongoose = require('mongoose');

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect('mongodb://localhost/reDirectDB');
}

var LinkSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  input_url: {type: String, required: true},
  customizr: {type: String, required: true}
});

module.exports = {
  Link: mongoose.model('Link', LinkSchema)
}
