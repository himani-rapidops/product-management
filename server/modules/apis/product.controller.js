const Product = require('../../models/product.model');
const User = require('../../models/user.model');
const fs = require('fs');
const q = require('q');
const asyncWhilst = require('async');
const lodash = require('lodash');


class ProductController {
  constructor(app) {
    // all routes are defined here
    app.get('/getProducts', this.getAllProducts);
    app.post('/addProduct', this.addProduct);
    app.get('/singleProduct/:id', this.getProduct);
    app.put('/updateProduct', this.updateProduct);
    app.delete('/singleProduct', this.deleteProduct);
    app.post('/imageUpload', this.uploadSingleImage);
    app.post('/moreImagesUpload', this.uploadMultipleImage);
    app.get('/cart/:id', this.getCartProducts);
    app.post('/cart/add', this.addToCart);

  }

  // for getting all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.find({});
      return res.send(products);
    } catch (e) {
      return res.send({
        error: e,
        success: false,
        message: 'Error while getting products.'
      });
    }
  }

  // for adding item to cart
  async addToCart(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.body.UserId, { $addToSet: { Products: req.body.ProductId } }, { new: true });
      if (user) {
        return res.send({ success: true, message: 'product has been added to cart' });
      } else {
        return res.send({
          success: false,
          message: 'You don\'t have access to add items into cart.'
        });
      }
    } catch (e) {
      return res.send({
        error: e,
        success: false,
        message: 'Error while adding item to cart'
      });
    }
  }

  // for getting all cart items of user
  async getCartProducts(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      let productIds = [];
      if (user) {
        productIds = user.Products;
      }
      const products = await Product.find({ _id: { $in: lodash.uniq(productIds) } });
      let sum = 0;
      for (let i = 0; i < products.length; i++) {
        sum += parseInt(products[i].ProductPrice);
      }
      const cartObj = { Products: products, TotalAmount: sum };
      return res.send(cartObj);
    } catch (e) {
      return res.send({
        error: e,
        success: false,
        message: 'Error while getting cart products.'
      });
    }
  }

  // add product
  async addProduct(req, res) {
    try {
      let product = new Product({
        ProductName: req.body.ProductName,
        ProductSku: req.body.ProductSku,
        ProductPrice: req.body.ProductPrice,
        MoreProductImages: req.body.MoreProductImages,
        ProductImage: req.body.ProductImage,
        UpdatedBy: req.body.UpdatedBy
      });
      const createdProduct = await product.save();

      return res.send({
        success: true,
        message: 'Product successfully added',
        product: createdProduct
      });

    } catch (e) {
      return res.send({
        error: e,
        success: false,
        message: 'Error while adding product.'
      });
    }
  }

  // get single product
  async getProduct(req, res) {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      return res.send(product);
    } catch (e) {
      return res.send({
        error: e,
        success: false,
        message: 'Error while getting product.'
      });
    }
  }

  // update product
  async updateProduct(req, res) {
    try {
      const productData = req.body;
      const product = await Product.findById(productData._id);
      product.ProductName = productData.ProductName;
      product.ProductPrice = productData.ProductPrice;
      product.ProductSku = productData.ProductSku;
      product.ProductImage = productData.ProductImage;
      product.MoreProductImages = req.body.MoreProductImages;
      product.UpdatedBy = req.body.UpdatedBy;
      const updatedItem = await product.save();
      return res.send({
        success: true,
        product: updatedItem,
        message: 'Product successfully updated'
      });
    } catch (e) {
      return res.send({
        error: e,
        success: false,
        message: 'Error while updating product.'
      });
    }
  }


  // delete product
  deleteProduct(req, res) {
    let defer = q.defer();
    let productId = req.query.productId;

    Product.findById(productId)
      .then((foundItem) => {
        if (!foundItem) {
          return res.send({
            success: false,
            message: 'Product not found.',
            id: productId
          });
        } else {
          return foundItem;
        }
      }).then((foundItem) => {
        _deleteFile(foundItem);
        _deleteMultipleFiles(foundItem);
      })
      .then((item) => {
        return Product.remove({ _id: productId })
      })
      .then(() => {
        res.send({
          success: true,
          message: 'Product successfully deleted',
          id: productId
        })
      })
      .catch(() => {
        res.send({
          success: false,
          message: `The request is not completed. Product with id ${productId} is not successfully deleted`
        });
      });

    let _deleteFile = (product) => {
      fs.unlink(`${global.ROOT_PATH}/${product.ProductImage}`, (error) => {
        if (error) {
          defer.reject(error);
        } else {
          defer.resolve();
        }
      });
      defer.promise;
    };
    let _deleteMultipleFiles = (product) => {
      let i = 0;
      asyncWhilst.whilst(
        () => {
          if (i === product.MoreProductImages.length) {
            return false;
          }
          return true;
        },
        (callback) => {
          fs.unlink(`${global.ROOT_PATH}/${product.MoreProductImages[i].path}`, (error) => {
            i++;
            callback()
          },
            (e) => {
              if (e) {
                defer.reject(e);
              } else {
                defer.resolve();
              }
            });
        }
      );
      defer.promise;
    };
  }

  uploadSingleImage(req,res){
    global.upload(req, res, (err) => {
      if (err) {
        return res.send({status: 'error', message: "Something went wrong!", error: err});
      }
      return res.send({
        status: 'success',
        message: "File uploaded successfully!.",
        filePath: req.files[0].path,
      });
    });
  }

  uploadMultipleImage(req,res){
    global.moreImagesUpload(req, res, (err) => {
      if (err) {
        return res.send({status: 'error', message: "Something went wrong!", error: err});
      }
      return res.send({status: 'success', message: "File uploaded successfully!.", files: req.files});
    });
  }
  // upload single file
  // async uploadSingleImage(req, res) {
  //   try {
  //     await global.upload(req, res);
  //     return res.send({
  //       status: 'success',
  //       message: 'File uploaded successfully!.',
  //       filePath: req.files[0].path,
  //     });
  //   } catch(e) {
  //     return res.send({ status: 'error', message: 'Something went wrong!', error: e });
  //   }
  // }

  // upload multiple images
  // async uploadMultipleImage(req, res) {
  //   try {
  //     await global.moreImagesUpload(req, res);
  //     return res.send({
  //       status: 'success',
  //       message: 'Files uploaded successfully!.',
  //       filePath: req.files,
  //     });
  //   } catch(e) {
  //     return res.send({ status: 'error', message: 'Something went wrong!', error: e });
  //   }
  // }
}

module.exports = ProductController;
