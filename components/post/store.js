const boom = require('@hapi/boom');
const Post = require('./model');

async function addPost(post){
    const newPost = new Post(post);
    return newPost.save();
    //return Post.create(post);
}
function listPosts(){
    return Post.find();        
}
function getPost(){
}
function updatePost(){
}
function deletePost(){
}



module.exports = { addPost, listPosts, getPost, updatePost, deletePost };