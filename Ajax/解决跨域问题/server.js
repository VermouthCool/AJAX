var express = require('express');
var app = express();
app.use(express.urlencoded({extended:true}));
app.listen(8080);
app.use(express.static('.'));
app.get('/',function(req,res){
    var arr = [{name:'jian',age:18}];
    var {callback} = req.query;
    res.send(`${callback}(${JSON.stringify(arr)})`);  // 使用原生和jquery都要传这个 调用success
    console.log(req.query);
    /*
    {
  callback: 'jQuery11100783607541386151_1597486535954',
  name: 'jian',
  _: '1597486535955'
}
    */
})