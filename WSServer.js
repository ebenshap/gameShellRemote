var WebSocketServer = require('websocket').server,
GameShell = require('./gameShell.js'),
util = require('./util.js');

module.exports.create = function(server){
  var wsServer= new WebSocketServer({ httpServer: server })  
  
  wsServer.on('request', function(request){
    var connection= request.accept(null, request.origin) || null  
    console.log('Success!!!')
    connection.on('close', function(connection){
      console.log('Closed :-(')
    })
    
    connection.on('message', function(message){
      if (message.type === 'utf8') {
        console.log('Received Message: ' + message.utf8Data);
        connection.sendUTF(message.utf8Data);
      }
    })
    
  })
}
