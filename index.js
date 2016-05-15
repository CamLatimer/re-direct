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

app.get('/linke_me_dude', function(req, res){
  res.send('./public/index.html');
})
app.get('/link_me_dude/yo_link/:customizr', function(req, res){
  res.send('gotcha, here is the link: ' + '<a href="/link_me_dude/'+req.params.customizr+'">link_me_dude/'+req.params.customizr+'</a>');
});
app.get('/link_me_dude/:customizr', function(req, res){
  Link.findOne({customizr: req.params.customizr}, function(err, link){
    res.redirect(link.input_url);
  });
});

app.route('/links')
.get(function(req, res){
  Link.find({}).then(function(links){
    res.json(links);
  });
})
.post(function(req, res){
  Link.create(req.body, function(err, link){
    if(err){
      console.log(err);
    }else{
      console.log('whoa, you just created: ' + link);
      res.redirect('/link_me_dude/yo_link/' + link.customizr);
    }
  });
});
