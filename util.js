var crypto=require('crypto'),
//is this an object factory here below?
shasum=crypto.createHash('sha1'),
emailjs=require('emailjs'),
cookieSignature = require('cookie-signature'),
http = require('http'),
querystring = require('querystring')

module.exports = {
  
  //ec2 and my local computer sign the cookies differently. What gives?
  unsignCookie : function unsignCookie (valueToUnsign, cookieSecret){
    
    var sid = valueToUnsign
    sid = decodeURIComponent(sid)
    var prefix = "s:";
    var sid = sid.replace( prefix, "" );
    //sid = decodeURIComponent(sid)
    
    sid = cookieSignature.unsign(sid, cookieSecret)
    console.log(sid)
    return sid
  },
  
  createQueryString : function(object){
    var post_data_string=''
    for(item in object){
      post_data_string+= encodeURIComponent(item)+'='+encodeURIComponent(object[item])+'&'
    }
    var strLen = post_data_string.length;
    post_data_string = post_data_string.slice(0,strLen-1);
    return post_data_string
  },

  sizeof : function sizeof(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },
  
  extend : function extend(dest, src){
    for(var prop in src){
      dest[prop] = src[prop]
    }
  },

  generateRandom : function generateRandom(num){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < num; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text
  },
  
  makeRequest:function(data, path, cb){
    //configure the request
    var options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'POST',
    };
  
    if(data){
      data = querystring.stringify(data)
      options.headers= {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    }
  
    //send out the request
    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      //send the response body to the callback
      res.on('data', function (chunk) {
        console.log('response')
        if(cb){
          cb(0, chunk)
        }
      });
  
    }); 
  
    //after creating the request, write the post data to the body
    if(data){
      console.log(data)
      req.write(data);
    }
  
    req.on('error', function(e) {
      cb(1, e.message);
    });

    req.end();
  }
}
