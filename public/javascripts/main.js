$(document).ready(function(){

//--------------------------------------------------------------------------------Router Code
    var vent = _.extend({}, Backbone.Events)
    
    var AppRouter = Backbone.Router.extend({
      
      initialize: function(options){
        var that = this
        this.vent = options.vent
        
      },
    
      routes: {
        "":'notSure',
        "choose":"choose",
        "wait": "wait",
        "play": "play"
      }
    });
    
    // Initiate the router
    var app_router = new AppRouter({vent:vent});
    
    app_router.on('route:notSure', function() {
      this.vent.trigger('showPage', '')
      $('#wait').hide()
      $('#play').hide()
    })
    
    app_router.on('route:choose', function() {
      this.vent.trigger('showPage', 'choose')
      $('#wait').hide()
      $('#play').hide()
    })

    app_router.on('route:wait', function() {
      this.vent.trigger('showPage', 'wait')
      $('#wait').show()
      $('#play').hide()
    })
  
    app_router.on('route:play', function() {
      this.vent.trigger('showPage', 'play')
      $('#wait').hide()
      $('#play').show()
    })

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start(); 
  
  
  var supportVarified = 0

  /*var waitView = new WaitView()
  
  var gamevent:ventew GameModel()
  var gameView = new GameView({
    model:gameModel,
    vent:vent
  })*/
 
  var chooseView = new ChooseView({
    vent:vent
  })
  
  
//------------------------------------------------------------------------------------Websocket code  
  connection=new WebSocket('ws://'+url+':3000')
  connection.onopen = function(){
    connection.send('hello')
  }


  //recieve
  connection.onmessage = function(message){
    if(!supportVarified){
      supportVarified = 1
      app_router.navigate('choose', true)
    }
   var json
   try{
     json = JSON.parse(message.data)    
     if(json.chat){
       vent.trigger('chatDisplay', json.chat)
     } 
   
     if(json.names){
       if(Backbone.history.fragment != 'wait'){
         app_router.navigate('wait', true)
       }
       vent.trigger('waitList', json.names)
       
     }
   
     if(json.game){
       if(Backbone.history.fragment != 'play'){
         app_router.navigate('play', true)
       }
       vent.trigger('gameInfo', json.game)
     }
     
     if(json.error){
       vent.trigger('generalError', json.error)
     }
     
   }catch(e){
     console.log('Do Nothing.')
   }
  }
  
  //send
  vent.on('joinGame', function(){
    connection.send('join')
  })
  
  vent.on('exitGame', function(){
    connnection.send('exit')
  })

//------------------------------------------------------
  
  setTimeout(function(){
    if(!supportVarified){
      alert('It looks like either there are network problems or your browser doesn\'t support websockets.')
    }
  }, 1000)

})