const { textField, numberField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const productValidationCreate = validationMiddleware([
  textField("name"),
  numberField("price"),
  numberField("stock", 1, 200),
]);

const productValidationUpdate = validationMiddleware([
  textField("name"),
  numberField("price", 1, true),
  numberField("stock", 1, 200, true),
]);

module.exports = {
  productValidationCreate,
  productValidationUpdate,
};
