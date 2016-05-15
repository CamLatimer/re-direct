var Schema = require('./connection');
var LinkModel = Schema.Link;

LinkModel.remove().then(function(){
  var seedLink = new LinkModel({input_url: 'https://google.com', customizr: 'googs'});
  seedLink.save(function(err){
    if(err){
      console.log(err);
    } else{
      console.log('link saved...');
      process.exit();
    }
  });

})
