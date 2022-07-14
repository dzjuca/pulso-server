const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
    },
    username: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    birthday: {
        type:Date
    },
    phone: {
        type:String
    },
    subscription:{
        type:String
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    avatar: 
    {
        type:String
    }
});







const model = mongoose.model('User', userSchema);
module.exports = model;

