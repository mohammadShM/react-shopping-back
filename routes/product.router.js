// global var
const express = require("express");
const { check } = require("express-validator");
// local var
const productControllers = require("../controllers/product-controllers");
const router = express.Router();
// routers
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);
router.get("/:id/comments", productControllers.getCommentById);
router.post(
   "/:id/comments",
   [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
   productControllers.createComment
);
// export =====================================================================================
module.exports = router;
