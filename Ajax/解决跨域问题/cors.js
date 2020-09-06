var express = require('express');
var app = express();
app.listen(8080)
app.post('/',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
    res.send('jian');
})