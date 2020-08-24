const express = require('express');
const Post = require('../models/posts');
const User = require('../models/users');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/posts', auth, async (req, res)=>{
    const post = new Post({
        ...req.body,
        owner_id: req.user._id,
        owner_name: req.user.name
    });
    try{
        await post.save();
        res.status(201).send(post);
    }catch(e){
        res.status(400).send();
    }
});
router.get('/posts/me', auth, async (req, res)=>{
    const sort = {
        createdAt: -1
    }
    try{
        await req.user.populate({
            path: 'posts',
            options: {
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.posts);
    }catch(e){
        res.status(500).send({error: e.message});
    }
})

router.patch('/posts/like/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send();
        }
        const check = post.likes.some((like) => like.likedById.toString() === req.user._id.toString());
        if(check){
            post.likes = post.likes.filter(like => like.likedById.toString() !== req.user._id.toString());
            await post.save();
            return res.status(200).send(post);
        }
        post.likes = post.likes.concat({likedById: req.user._id, name: req.user.name});
        await post.save();
        return res.status(200).send(post);
    }catch(e){
        return res.status(500).send({error: e.message});
    }
});
router.patch('/posts/comment/:id', auth, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send();
        }
        post.comments = post.comments.concat({by: req.user._id, description: req.body.description, name: req.user.name});
        await post.save();
        res.status(200).send(post);
    }catch(e){
        res.status(500).send({error: e.message});
    }
});
router.patch('/posts/:id', auth, async(req, res)=>{
    const allowedUpdates = ['content'];
    const updates = Object.keys(req.body);
    const shouldUpdate = updates.every((update)=> allowedUpdates.includes(update));
    if(!shouldUpdate){
        return res.status(400).send({error: 'Invalid Updates!'});
    }
    try{
        const post = await Post.findOne({_id: req.params.id, owner_id: req.user._id});
        if(!post){
            return res.status(404).send();
        }
        updates.forEach(update => post[update] = req.body[update]);
        await post.save();
        res.status(200).send(post);
    }catch(e){
        res.status(400).send({error: e.message});
    }
});
router.get('/posts/:id', auth, async(req, res)=>{
    try{
        const post = await Post.find({owner_id: req.params.id}).populate('owner_id');
        if(!post){
            return res.status(404).send();
        }
        res.status(200).send(post);
    }catch(e){
        res.status(500).send();
    }
});
router.delete('/posts/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findOneAndDelete({_id: req.params.id, owner_id: req.user._id});
        if(!post){
            return res.status(404).send();
        }
        res.status(200).send(post);
    }catch(e){
        res.status(500).send();
    }
});
router.get('/posts', auth, async(req, res)=>{
    try{
        var posts = [];
        for(var i=0; i<req.user.following.length; i++){
            const post = await Post.find({owner_id: req.user.following[i].followingId}).populate('owner_id');
            posts = posts.concat(post);
        }
        posts = posts.concat(await Post.find({owner_id: req.user._id}).populate('owner_id'));
        posts.sort(function(a,b){
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return res.status(200).send(posts);
    }catch(e){
        res.status(500).send({error: e.message});
    }
})

module.exports = router;