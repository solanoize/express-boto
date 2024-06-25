const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  orderControllerList,
  orderControllerCreate,
  orderControllerDetail,
} = require("./controllers");
const { orderPermissionRead, orderPermissionCreate } = require("./permissions");
const { orderValidationCreate } = require("./validations");

const orderRouter = express.Router();
const ORDER_PATH = "/orders";

orderRouter.get(
  "/",
  [jwtAuthMiddleware, orderPermissionRead],
  orderControllerList
);

orderRouter.post(
  "/",
  [jwtAuthMiddleware, orderValidationCreate, orderPermissionCreate],
  orderControllerCreate
);

orderRouter.get(
  "/:id",
  [jwtAuthMiddleware, orderPermissionRead],
  orderControllerDetail
);

module.exports = {
  orderRouter,
  ORDER_PATH,
};
