const express = require('express');
const User = require('../models/users');
const router = new express.Router();
const sharp = require('sharp');
const multer = require('multer');
const auth = require('../middleware/auth');

router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try{
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch(e){
        res.status(400).send({error: e.message});
    }
})
router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(400).send({error: e.message});
    }
})
router.post('/users/logout', auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>token.token !== req.token);
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})
router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})
router.get('/users/all', auth, async (req, res) => {
    try{
        var users = await User.find({});
        users = await req.user.sendAll(users);
        res.status(200).send(users);
    }catch(e){
        res.status(500).send({error: e.message});
    }
})
router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user);
})
router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'password', 'name'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'});
    }
    try{
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.status(200).send(user);
    }catch(e){
        return res.status(400).send(e);
    }
})
router.delete('/users/me', auth, async (req, res)=>{
    try{
        await req.user.remove();
        res.status(200).send(req.user);
    }catch(e){
        res.status(500).send();
    }
})
router.patch('/users/follow/:id', auth, async(req, res)=>{
    try{
        const userToBeFollowed = await User.findById(req.params.id);
        if(!userToBeFollowed){
            return res.status(404).send();
        }
        const check = req.user.following.some(item => item.toString() === userToBeFollowed._id.toString());
        console.log(check);
        if(check){
            return res.status(400).send({error: 'User already followed!'});
        }
        // req.user.following = req.user.following.concat({follows: userToBeFollowed._id});
        req.user.following = req.user.following.concat({followingId: userToBeFollowed._id, name: userToBeFollowed.name});
        userToBeFollowed.followers = userToBeFollowed.followers.concat({followerId: req.user._id, name: req.user.name});
        await req.user.save();
        await userToBeFollowed.save();
        res.status(200).send({user: req.user});
    }catch(e){
        res.status(500).send({error: e.message});
    }
})
router.patch('/users/unfollow/:id', auth, async(req, res)=>{
    try{
        const userToBeUnfollowed = await User.findById(req.params.id);
        if(!userToBeUnfollowed){
            return res.status(404).send();
        }
        const check = req.user.following.some(item => item.toString() === userToBeUnfollowed._id.toString())
        if(check){
            return res.status(400).send({error: 'User not followed!'});
        }
        req.user.following = req.user.following.filter((item)=> item.followingId.toString() !== userToBeUnfollowed._id.toString());
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter((item) => item.followerId.toString() !== req.user._id.toString());
        await req.user.save();
        await userToBeUnfollowed.save();
        res.status(200).send({user: req.user});
    }catch(e){
        res.status(500).send();
    }
})
router.get('/users/:id', auth, async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }catch(e){
        res.status(500).send();
    }
})
const upload = multer({
    limits: 1000000,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Please upload an image'));
        }
        return cb(undefined, true);
    }
});
router.post('/users/me/avatar' , auth, upload.single('avatar'), async(req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 200, height: 200}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send(req.user);
}, (error, req, res, next)=>{
    console.log(error.message);
    return res.status(400).send({error: error.message});
})

router.delete('/users/me/avatar', auth, async(req, res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send();
})
module.exports = router;