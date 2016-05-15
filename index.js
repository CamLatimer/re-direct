var express = require('express');
var mongoose = require('mongoose');
var Schema = require('./db/connection');
var parser = require('body-parser');

app = express();
app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
  console.log("server runnin'");
});

var Link = Schema.Link;

app.route('/links')
.get(function(req, res){
  Link.find({}).then(function(links){
    res.json(links);
  });
})
.post(function(req, res){
  console.log(req.body);
  Link.create(req.body).then(function(err, link){
    if(err){
      console.log(err);
    }else{
      res.send('whoa, you just created: ' + link);
    }
  });
});
