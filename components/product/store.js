const boom = require('@hapi/boom');
const Product = require('./model');

function addProduct(product){
    const newProduct = new Product(product);
    return newProduct.save();
}

function listProducts(req){  
    try {

        let products = [];
        if(req.query.query){
            let pattern = `${req.query.query}`;
            const query = { category: { $regex: pattern, $options: "i" } } ;
            products = Product.find( query ); 
        }else{
            products = Product.find();
        }
        return products;

    } catch (error) {

        throw boom.internal();

    }
}

module.exports = { addProduct, listProducts };