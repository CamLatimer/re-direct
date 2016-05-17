var express = require('express');
var mongoose = require('mongoose');
var Schema = require('./db/connection');
var parser = require('body-parser');

app = express();
app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended: true}));
// app.use(parser.json({extended: true}));
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
  console.log("server runnin'");
});

// model
var Link = Schema.Link;

// routing

// home page. express looks for index.html in the root dir when pointed to '/'
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
// add to link to the db and redirect to
// a page showing the user's new url
.post(function(req, res){
  Link.create(req.body, function(err, link){
    if(err){
      console.log(err);
    }else{
      console.log('whoa, you just created: ' + link);
      res.redirect('/your_link_is/' + link.customizr);
    }
  });
});
app.get('/your_link_is/:customizr', function(req, res){
  res.send('gotcha, here is the link: ' + '<a href="/'+req.params.customizr+'">' +'/'+req.params.customizr+'</a>');
});
app.get('/:customizr', function(req, res){
  Link.findOne({customizr: req.params.customizr}, function(err, link){
    res.redirect(link.input_url);
  });
});
