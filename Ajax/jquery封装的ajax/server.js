var express = require('express');
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('./'));
app.get('/',function(req,res){
    res.send('已经收到了请求')
    console.log(req.query);
});
app.post('/',function(req,res){
    res.send('已经收到了post请求');
    console.log(req.body);
});
app.listen(8080);