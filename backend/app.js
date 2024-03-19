var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var app=express();
const Post=require('./model/post');
const mongoose=require('mongoose'); 
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

mongoose.connect('mongodb+srv://shivomchawla2000:HKvHoluuaXle9NOU@cluster0.kywlcmt.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to database!');
})
.catch(()=>{
    console.log('Connection failed');
});
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
    const post= new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    posts.push(post);
    console.log(posts);
    res.status(201).json({
        message:'Post added successfully'
    });
})
app.get('/api/posts',(req,res,next)=>{

    Post.find().then(documents=>{
        console.log(documents);
        res.status(200).json({
            message:'Posts fetched successfully!',
            posts:documents
        });
    }); // this will return a promise
    
})
app.delete('/api/posts/:id',(req,res,next)=>{
    console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result)
        res.status(200).json({message:'Post deleted!'});   
    }); // this will return a promise 
   
})

app.put('/api/posts/:id',(req,res,next)=>{
    const post= new Post({
        title: req.body.title,
        content: req.body.content,
        _id:req.body.id
    });
    Post.updateOne({_id:req.params.id},post).then(result=>{
        console.log(result);
        res.status(200).json({message:'Update successful!'});
    });
})
module.exports=app;