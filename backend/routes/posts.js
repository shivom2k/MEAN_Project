const express=require('express');
const routes=express.Router();

const Post=require('../model/post');

routes.post('',(req,res,next)=>{
    const post= new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
    res.status(201).json({
        message:'Post added successfully'
    });
})
routes.get('',(req,res,next)=>{

    Post.find().then(documents=>{
        console.log(documents);
        res.status(200).json({
            message:'Posts fetched successfully!',
            posts:documents
        });
    }); // this will return a promise
    
})
routes.delete('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result)
        res.status(200).json({message:'Post deleted!'});   
    }); // this will return a promise 
   
})
routes.get('/:id',(req,res,next)=>{
    Post.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({message:'Post not found!'});
        }
       
        
    })
})
routes.put('/:id',(req,res,next)=>{
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

module.exports=routes;