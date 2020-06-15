const fs = require('fs'); 
const path = require('path'); 

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);



const getProductFromFile = (cb) => {
   
    fs.readFile(p, (err,fileContent) => {
        
        if(err){
            return cb([]); 

        }
        else{
            cb(JSON.parse(fileContent)); 
        }
        
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price){
        this.title = title; 
        this.imageUrl = imageUrl; 
        this.description = description; 
        this.price = price; 

    }
    save(){

        this.id = Math.random().toString();
        getProductFromFile(products => {
            products.push(this); 
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err); 
            })
        });
        
        fs.readFile(p, (err,fileContent) => {
           
        });
    }

    static fetchAll(cb){

        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data', 
            'products.json'
        );

        fs.readFile(p, (err,fileContent) => {
            
            if(err){
                cb([]); 

            }
            cb(JSON.parse(fileContent)); 
        });
       
    }

    static findyId(id, cb){
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);

            cb(product); 

        })   
    }
}

