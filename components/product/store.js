const boom = require('@hapi/boom');
const Product = require('./model');

function addProduct(product){
    const newProduct = new Product(product);
    return newProduct.save();
}

function listProducts(){  
    return Product.find();  
}

module.exports = { addProduct, listProducts };