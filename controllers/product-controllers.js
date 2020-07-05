// global var
const { validationResult } = require("express-validator");
const _ = require("lodash");
// local var
const HttpError = require("../models/http-error");
const fakeData = require("../models/fakeDataFile");
// fake data
const data = fakeData.data;
// for routers
const getAllProducts = (req, res) => {
   res.json(data.products);
};
const getProductById = (req, res) => {
   res.json(_.find(data.products, { id: parseInt(req.params.id) }));
};
const getCommentById = (req, res) => {
   res.json(
      _.get(_.find(data.products, { id: parseInt(req.params.id) }), "comments")
   );
};
const createComment = (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new HttpError("Invalid Inputs", 422);
   }
   const product = _.find(data.products, { id: parseInt(req.params.id) });
   if (product) {
      product.comments = product.comments || [];
      product.comments.push(req.body);
      res.end();
   } else {
      // res.status(404).json(new Error("Product not found"));
      const error = new HttpError("Could not find user!", 422);
      return next(error);
   }
};
// for exports
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getCommentById = getCommentById;
exports.createComment = createComment;
