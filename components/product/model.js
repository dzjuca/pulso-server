const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    createdOn: {
        type: Date,
        default: Date.now 
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
    category: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

productSchema.index({category:'text'});
const model = mongoose.model('Product', productSchema);
module.exports = model;