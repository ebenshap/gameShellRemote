express = require('express'),

routes = require('./routes.js'),
httpServer = require('./HTTPServer.js').server,
app = require('./HTTPServer.js').app
  
require('./WSServer.js').create(httpServer)  
  
app.get('/test', routes.test)
