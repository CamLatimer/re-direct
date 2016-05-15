var mongoose = require('mongoose');

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect('mongodb://localhost/reDirectDB');
}

var LinkSchema = new mongoose.Schema({
  input_url: String,
  customizr: String,
});

module.exports = {
  Link: mongoose.model('Link', LinkSchema)
}
