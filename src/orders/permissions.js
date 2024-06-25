const { hasPermissionsMiddleware } = require("../utils/middlewares");

const orderPermissionRead = hasPermissionsMiddleware(["read-orders"]);
const orderPermissionCreate = hasPermissionsMiddleware([
  "create-orders",
  "read-products",
]);

module.exports = {
  orderPermissionRead,
  orderPermissionCreate,
};
