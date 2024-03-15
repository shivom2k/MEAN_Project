var express=require('express');
var app=express();
app.use((req,res,next)=>{
    console.log('First Middleware');
    next();
})
app.use((req,res,next)=>{
    console.log('First Middleware');
    res.send('Hello from express');
})
module.exports=app;