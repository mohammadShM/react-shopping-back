// global var
const express = require("express");
const cors = require("cors");
// local var
const HttpError = require("./models/http-error");
const productRouter = require("./routes/product.router");
// initial variable
const app = express();
// middleware
app.use(cors());
// products route handler
app.use("/products", productRouter);
// for middleware address not found
app.use((req, res, next) => {
   // noinspection UnnecessaryLocalVariableJS
   const error = new HttpError("Not Found!", 404);
   throw error;
});
// for not found middleware
app.use((error, req, res, next) => {
   // noinspection JSUnresolvedVariable
   if (res.headerSet) {
      return next(error);
   }
   res.status(error.code || 500);
   res.json({ message: error.message || "Error" });
});
app.use(express.json());
// port listen =====
const port = process.env.PORT || 5000;
app.listen(port, () =>
   console.log(`shopping server is running on port ${port}`)
);
