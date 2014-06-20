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
    
    connection.on('message', function(request){
      if (request.type === 'utf8') {
        var data = request.utf8Data
        var response = ''
        
        if(data =='hello'){
          response='hi'
          connection.sendUTF(response);
        }
        
        if(data=='join'){
          
          var names = [
            'Harry',
            'Curly',
            'Moe'
          ]
          var game = {}
          
          response= JSON.stringify({
            game:game,
            names:names
          })
          connection.sendUTF(response);
        }
        
      }
    })
    
  })
}
