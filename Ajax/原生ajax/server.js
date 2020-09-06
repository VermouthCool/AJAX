var express = require('express');
var app = express();
app.listen(8080);
app.use(express.urlencoded({extended:true}))
app.use(express.static('./'))
app.get('/ajax_get',function(req,res){
    res.send('发来Ajax的get请求');
});
app.post('/ajax_post',function(req,res){
    console.log(req.body);
    res.send('post请求已经收到')
})