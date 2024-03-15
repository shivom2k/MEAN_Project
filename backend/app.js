var express=require('express');
var app=express();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'); // * means any domain can access the server
    res.setHeader('Acess-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept'); // * means any domain can access the server
    res.setHeader('Acess-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS'); // * means any domain can access the server
    next();
})
app.use('/api/posts',(req,res,next)=>{

    const post=[
        {
            id:'fadf12421l',
            title:'First server-side post',
            content:'This is coming from the server'
        },
        {
            id:'154545454',
            title:'Second server-side post',
            content:'This is coming from the server'
        }
    ];
    res.status(200).json({
        message:'Posts fetched successfully!',
        posts:post
    });
    
})
module.exports=app;