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

// model
var Link = Schema.Link;

// routing below

// home page (express looks for index.html in the root dir when pointed to '/')
app.get('/link_me_dude', function(req, res){
  res.redirect('/');
});
// check out all the links in db
app.route('/links')
.get(function(req, res){
  Link.find({}).then(function(links){
    res.json(links);
  });
})
// add a link to the db and redirect to
// a page showing the user's new url
.post(function(req, res){
  console.log(req.body);
  Link.create(req.body, function(err, link){
    if(err){
      console.log(err);
    }else{
      console.log('whoa, you just created: ' + link);
      res.json(link);
    }
  });
});
// look at a db doc
app.get('/your_link_is/:customizr', function(req, res){
  Link.findOne({customizr: req.params.customizr}, function(err, link){
    if(err){
      res.send(err);
    } else{
      res.json(link);
    }
  })
});
// redirect to the user's enterd url
app.get('/:customizr', function(req, res){
  Link.findOne({customizr: req.params.customizr}, function(err, link){
    console.log(link.input_url);
    res.redirect(link.input_url);
  });
});
