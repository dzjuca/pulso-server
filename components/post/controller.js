const store = require('./store');
const boom = require('@hapi/boom');

async function addPost(post){
    if (!post){
        throw boom.badData;
    }
    const postDB = await store.addPost(post);
    await postDB.populate('usuario');
    return postDB;
}
async function listPosts(skip, limit){
    const listPostDB = await store.listPosts()
                                  .limit(limit)
                                  .sort({_id:-1})
                                  .skip(skip)
                                  .populate('usuario'); 
                                  
                                  
    return listPostDB;
}
function getPost(){

}
function updatePost(){

}
function deletePost(){
}

const controller = { addPost, listPosts, getPost, updatePost, deletePost };

module.exports = controller;
