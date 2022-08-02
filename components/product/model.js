const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    createdOn: {
        type: Date
    },
    description: {
        type: String
    },
    imgs: [{
        type: String
    }],
    price: {
        type: String
    },
    stock: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

productSchema.pre('save', function(next){
    this.createdOn = new Date();
    next();
});

const model = mongoose.model('Product', productSchema);
module.exports = model;