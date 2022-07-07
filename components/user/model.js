const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required:true
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
    createdOn: { 
        type: Date, 
        default: Date.now 
    }
});

const model = mongoose.model('User', userSchema);
module.exports = model;

