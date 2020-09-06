var {Router} = require('express');
var app = new Router();
var result={}
app.get('/login',function(req,res){
    res.render('login',{result});
})
app.get('/register',function(req,res){
    res.render('register',{result});
})
module.exports = app;

// 结构胶  5，6 泡泡胶 1