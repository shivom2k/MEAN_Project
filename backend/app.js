var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var app=express();
const posts=[
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
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'); // * means any domain can access the server
    res.setHeader('Acess-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept'); // * means any domain can access the server
    res.setHeader('Acess-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS'); // * means any domain can access the server
    next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.post('/api/posts',(req,res,next)=>{
    const post=req.body;
    posts.push(post);
    console.log(posts);
    res.status(201).json({
        message:'Post added successfully'
    });
})
app.use('/api/posts',(req,res,next)=>{

    
    res.status(200).json({
        message:'Posts fetched successfully!',
        posts:posts
    });
    
})
module.exports=app;