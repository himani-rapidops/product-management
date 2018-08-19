'use strict';
const mongoose = require('mongoose');

const productModel = function() {
	const productSchema = mongoose.Schema({
		ProductName : String,
		ProductSku : String,
		ProductPrice : String,
		ProductImage : String,
		MoreProductImages:Array,
		UpdatedBy: String
  });
  return mongoose.model('Product', productSchema);
};

module.exports = new productModel();
