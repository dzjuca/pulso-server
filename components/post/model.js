const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document =mongoose.Document;

const postSchema = new Schema({

    createdOn: {
        type: Date
    },
    message: {
        type: String
    },
    img: [{
        type: String
    }],
    coords: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

postSchema.pre('save', function(next){
    this.createdOn = new Date();
    next();
});

const model = mongoose.model('Post', postSchema);
module.exports = model;