const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  productPermissionRead,
  productPermissionUpdate,
  productPermissionDelete,
  productPermissionCreate,
} = require("./permissions");
const {
  productControllerList,
  productControllerDetail,
  productControllerUpdate,
  productControllerDelete,
  productControllerCreate,
} = require("./controllers");

const {
  productValidationCreate,
  productValidationUpdate,
} = require("./validations");

const productRouter = express.Router();
const PRODUCT_PATH = "/products";

productRouter.get(
  "/",
  [jwtAuthMiddleware, productPermissionRead],
  productControllerList
);

productRouter.post(
  "/",
  [jwtAuthMiddleware, productValidationCreate, productPermissionCreate],
  productControllerCreate
);

productRouter.get(
  "/:id",
  [jwtAuthMiddleware, productPermissionRead],
  productControllerDetail
);

productRouter.put(
  "/:id",
  [jwtAuthMiddleware, productValidationUpdate, productPermissionUpdate],
  productControllerUpdate
);

productRouter.put(
  "/:id",
  [jwtAuthMiddleware, productPermissionDelete],
  productControllerDelete
);

module.exports = {
  productRouter,
  PRODUCT_PATH,
};
