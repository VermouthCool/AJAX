var {Router} = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var sessionConnect = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost:27017/demo',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
mongoose.connection.on('open',function(err){
    if(!err) console.log('成功连接数据库');
})
var Schema = mongoose.Schema;
var rule = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    enable_flag:{
        type:String,
        default:'Y'
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})
var modle = mongoose.model('login',rule);
var emailreg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var usernamereg = /^[a-zA-Z0-9_-]{4,16}$/;
var passwordreg = /^\d{5,}$/
var result = {};
var app = new Router()
app.use(session(
    {
        name:'user_id',
        secret:'jiange',
        saveUninitialized:false,
        resave:true,
        store: new sessionConnect({
            url:'mongodb://localhost:27017/session-info',
            touchAfter:360000*24
        }),
        cookie:{
            maxAge:1000*30
        }
    }
))
app.get('/usercenter',function(req,res){
    var {_id} = req.session;
    if(!_id){
        res.redirect('/login');
        return
    }
    modle.findOne({_id},function(err,data){
        if(!data){
            res.redirect('/login')
        }else{
            res.send(`你好，帅气的${data.username}`);
        }
    })
})
app.post('/',function(req,res){
    var {email,username,password,repeat} = req.body;
    if(email&&username&&password){
        if(!emailreg.test(email)){
            result.email='邮箱的格式不对'
        }
        if(!usernamereg.test(username)){
            result.username='用户名格式不对'
        }
        if(!passwordreg.test(password)){
            result.password='密码的格式不对'
        }
        if(password !== repeat){
            result.repeat='两次输入的密码不一致';
        }
        if(JSON.stringify(result)!=='{}'){
            res.render('register',{result});
            return;
        }
        modle.findOne({email,username},function(err,data){
            if(err){
                res.send('您的网络不稳定，请稍后再试')
                return;
            }
            if(data){
                result.err='该用户已经存在',
                res.render('login',{result});
                return 
            }
            modle.create({email,username,password},function(err,data){
                console.log(`用户名为${username},邮箱为${email}的用户注册成功`);
                // res.cookie('_id',data._id,{maxAge:1000*30});
                req.session._id = data._id;
                res.redirect('/usercenter');
            })
        })
    }else{
        modle.findOne({username,password},function(err,data){
            if(data){
                req.session._id=data._id;
                res.redirect('/usercenter')
            }else{
                result.err='密码或者用户名输入错误'
                res.render('login',{result})
            }
        })
    }
});
module.exports = app;