var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var path=require('path');
var app=express();
const PostRoutes=require('./routes/posts');
const Post=require('./model/post');
const mongoose=require('mongoose'); 

mongoose.connect('mongodb+srv://shivomchawla2000:ZdAyKoQ9rud35zbM@cluster0.kywlcmt.mongodb.net/test?retryWrites=true&w=majority')
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
app.use("/images", express.static(path.join("backend/images")));
app.use('/api/posts',PostRoutes);

module.exports=app;