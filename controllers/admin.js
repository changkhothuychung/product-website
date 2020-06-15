const Product = require('../models/product'); 

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true, 
      editing: false,

    });
  };
  
  exports.postAddProduct = (req, res, next) => {

    const title = req.body.title; 
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price; 
    Product.create({
      title:title, 
      price: price, 
      imageUrl: imageUrl, 
      description: description, 

    })
    .then((result) => {
      console.log(result); 
    })
    .catch();
    
  };


  exports.getProducts = (req,res,next) => {
    Product.findAll().then((products) => {

        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Product',
          path: '/admin/products',
         
        });
    
      }).catch(); 
    
  }


  exports.getEditProduct = (req, res , next ) => {
    const editMode= req.query.edit; 
    if(!editMode){
      res.redirect('/');
    }
    const prodId = req.params.productId; 
    Product.findByPk(prodId).then(
      product => {
        if(!product){
          res.redirect('/'); 
        }

        res.render('admin/edit-product', {
          product:product, 
          editing: editMode,
          path: '/admin/edit-product', 
          pageTitle: 'Edit Product', 

        })
      }
    ).catch(err =>{
      console.log(err); 
    });
  }