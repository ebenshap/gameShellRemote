var util = require('./util.js')
var config=require('./config.js')

var pubVars = {
  url:config.url
}

module.exports.test = function(req, res){
  res.render('test', pubVars); 
}

