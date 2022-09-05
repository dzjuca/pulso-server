const path = require('path');
const fs   = require('fs');
const uniqid = require('uniqid');
const { resolve } = require('path');


class FileSystem {

    constructor () { }

    saveTemporalImage(file, userId){

        return new Promise((resolve, reject) => {
            // make files
            const path = this.makeUserFile(userId);

            // file name
            const fileName = this.generateUniqueName(file.name);

            // Move file from Temp to my-Temp
            file.mv(`${path}/${fileName}`, (err) => {

                if(err){

                    reject(err);

                }else{

                    resolve();

                }

            });
        });
    }

    generateUniqueName(originalNme){

        const arrName = originalNme.split('.');
        const extension = arrName[arrName.length -1];
        const uniqueId = uniqid();

        return `${uniqueId}.${extension}`;

    }

    makeUserFile(userId){

        const userPath = path.resolve(__dirname, '../uploads/', userId);
        const userPathTemp = userPath + '/temp';

        const exists = fs.existsSync ( userPath );

        if(!exists){
            fs.mkdirSync(userPath);
            fs.mkdirSync(userPathTemp);
        }

        return userPathTemp;
    }

    imagesFromTempToPosts(userId){

        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'posts');

        if(!fs.existsSync(pathTemp)){
            return [];
        }

        if(!fs.existsSync(pathPost)){
            fs.mkdirSync(pathPost);
        }

        const imagesTemp = this.getImagesTemp(pathTemp);

        imagesTemp.forEach( image => {

            fs.renameSync(`${pathTemp}/${image}`,`${pathPost}/${image}`);

        });

        return imagesTemp;

    }

    getImagesTemp(pathTemp){

        return fs.readdirSync(pathTemp) || [];

    }

    getImageUrl(userId, img){

        // path posts
        const pathImage = path.resolve(__dirname, '../uploads/', userId, 'posts', img);

        // img exists
        const exists = fs.existsSync(pathImage);
        if(!exists){
            return path.resolve(__dirname, '../assets/default_400x250.jpg');
        }

        return pathImage;
    }

    imagesFromTempToProducts(userId){

        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');
        const pathProduct = path.resolve( __dirname, '../uploads/', userId, 'products');

        if(!fs.existsSync(pathTemp)){
            return [];
        }

        if(!fs.existsSync(pathProduct)){
            fs.mkdirSync(pathProduct);
        }

        const imagesTemp = this.getImagesTemp(pathTemp);

        imagesTemp.forEach( image => {

            fs.renameSync(`${pathTemp}/${image}`,`${pathProduct}/${image}`);

        });

        return imagesTemp;

    }

    getProductImageUrl(userId, img){

        // path products
        const pathImage = path.resolve(__dirname, '../uploads/', userId, 'products', img);

        // img exists
        const exists = fs.existsSync(pathImage);
        if(!exists){
            return path.resolve(__dirname, '../assets/default_400x250.jpg');
        }

        return pathImage;
    }
    imagesFromTempToAvatar(userId){

        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');
        const pathAvatar = path.resolve( __dirname, '../uploads/', userId, 'avatar');

        if(!fs.existsSync(pathTemp)){
            return [];
        }

        if(!fs.existsSync(pathAvatar)){
            fs.mkdirSync(pathAvatar);
        }

        const imagesTemp = this.getImagesTemp(pathTemp);

        imagesTemp.forEach( image => {

            fs.renameSync(`${pathTemp}/${image}`,`${pathAvatar}/${image}`);

        });

        return imagesTemp;

    }

    getAvatarImageUrl(userId, img){

        // path avatar
        const pathImage = path.resolve(__dirname, '../uploads/', userId, 'avatar', img);

        // img exists
        const exists = fs.existsSync(pathImage);
        if(!exists){
            return path.resolve(__dirname, '../assets/default_avatar.png');
        }

        return pathImage;
    }

}

module.exports = FileSystem;