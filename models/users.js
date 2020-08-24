const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Post = require('./posts');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    avatar: {
        type: Buffer
    },
    // followers: [{
    //     follower: {
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // }],
    followers: [
        {
            followerId: mongoose.Schema.Types.ObjectId,
            name: String
        }
    ],
    following: [
        {
            followingId: mongoose.Schema.Types.ObjectId,
            name: String
        }
    ],
    // following: [{
    //     follows: {
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('posts',{
    ref: 'Post',
    localField: '_id',
    foreignField: 'owner_id'
});

userSchema.methods.toJSON = function(){
    const user = this;
    userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.sendAll = function(users){
    for(var i = 0; i< users.length; i++){
        users[i] = users[i].toObject();
        delete users[i].token;
        delete users[i].password;
        delete users[i].tokens;
        delete users[i].followers;
        delete users[i].following;
    }
    return users;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to find email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '1h'});
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.pre('remove', async function(next){
    const user = this;
    await Post.deleteMany({owner_id: user._id});
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;