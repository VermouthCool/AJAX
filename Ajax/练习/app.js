var express = require('express');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var luyou = require('./luyou');
var yewu = require('./yewu');
var app = express();
app.listen(8080,function(err){
    if(!err) console.log('成功建立服务器');
});
app.set('view engine','ejs');
app.set('views','./');
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(luyou);
app.use(yewu);
