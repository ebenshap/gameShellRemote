var util = require('./util.js'),
express = require('express'),
app = express(),
http = require('http'),
path = require('path'), 
expressLayouts=require('express-ejs-layouts');
config = require('./config.js')

app.configure(function(){
  //static files and templates
  app.set('port', config.port );
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
 
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon());
  
  app.use(express.bodyParser());
  app.use(express.cookieParser());
});
//cookie should be good for 5 hours

app.configure('development', function(){
  app.use(express.errorHandler());
});

//create a server and then export it for availability in other scripts
var server=http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') );
});

module.exports.server = server
module.exports.app = app
