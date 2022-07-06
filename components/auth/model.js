const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    }
});

const model = mongoose.model('Auth', authSchema);
module.exports = model;

