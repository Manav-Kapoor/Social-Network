const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String
    },
    likes: [
        // likedBy =  {
        //     type: mongoose.Schema.Types.ObjectId
        // }
        {
            likedById: mongoose.Schema.Types.ObjectId,
            name: String
        }
    ],
    comments: [
        {
            by: mongoose.Schema.Types.ObjectId,
            description: String,
            name: String
        }
    ],
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;