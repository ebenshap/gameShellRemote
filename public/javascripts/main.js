var supportVarified = 0

connection=new WebSocket('ws://'+url+':3000')
connection.onopen = function(){
  connection.send('hello')
}

connection.onmessage = function(){
  supportVarified = 1
}

setTimeout(function(){
  if(!supportVarified){
    alert('It looks like either there are network problems or your browser doesn\'t support websockets.')
  }else{
    alert('all clear!')
  }
}, 1000)