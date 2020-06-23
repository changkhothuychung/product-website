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
    req.user.createProduct({
      title:title, 
      price: price, 
      imageUrl: imageUrl, 
      description: description, 
      userId: req.user.id,
    })
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch();

    
    
  };


  exports.getProducts = (req,res,next) => {
    req.user
    .getProducts()
    //Product.findAll()
    .then((products) => {

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
    req.user
      .getProducts({where: {id: prodId}})
    //Product.findByPk(prodId)
    .then(
      products => {
        const product = products[0]; 
        if(!product){
          return res.redirect('/'); 
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


  exports.postEditProduct = (req,res,next) => {
      const prodId = req.body.productId; 
      const updatedTitle = req.body.title; 
      const updatedPrice = req.body.price;
      const updatedImgUrl = req.body.imageUrl;
      const updatedDes = req.body.description; 
      Product.findByPk(prodId)
      .then(product => {
        console.log("get sucessfuly"); 
        product.title = updatedTitle;
        product.imageUrl = updatedImgUrl; 
        product.description = updatedDes; 
        product.price = updatedPrice;
        return product.save();
      })
      .then(result => {
        console.log("Updated"); 
      })
      
     
     
      res.redirect('/'); 
  }

  exports.postDelete = (req,res,next) => {

    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then( result => {
      console.log("deleted");
      res.redirect('/admin/products');
    })
    

  }


  

