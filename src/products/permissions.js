const { hasPermissionsMiddleware } = require("../utils/middlewares");

const productPermissionCreate = hasPermissionsMiddleware(["create-products"]);
const productPermissionRead = hasPermissionsMiddleware(["read-products"]);
const productPermissionUpdate = hasPermissionsMiddleware(["update-products"]);
const productPermissionDelete = hasPermissionsMiddleware(["delete-products"]);

module.exports = {
  productPermissionCreate,
  productPermissionRead,
  productPermissionUpdate,
  productPermissionDelete,
};
