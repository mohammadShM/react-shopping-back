// global var
const express = require("express");
const { check } = require("express-validator");
// local var
const productControllers = require("../controllers/product-controllers");
// noinspection JSUnresolvedFunction
const router = express.Router();
// routers
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);
router.get("/:id/comments", productControllers.getCommentById);
// noinspection JSUnresolvedFunction
router.post(
   "/:id/comments",
   [check("author").not().isEmpty(), check("text").isLength({ min: 2 })],
   productControllers.createComment
);
// export =====================================================================================
module.exports = router;
