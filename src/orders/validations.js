const { Product } = require("../products/models");
const { Error403 } = require("../utils/errors");
const { textField, itemsField, numberField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const orderValidationNonFieldOwnership = async (res) => {
  for (let item of res.locals.matchedData.items) {
    const product = await Product.findOne({
      _id: item._id,
      owner: res.locals.user._id,
    });
    if (!product) {
      throw new Error403();
    }
  }
};

const orderValidationCreate = validationMiddleware([
  textField("nomor"),
  itemsField("items"),
  textField("items.*._id").custom(async (_id) => {
    const product = await Product.findOne({ _id, isDelete: false });
    if (!product) {
      throw new Error("Product does not exists.");
    }
  }),
  textField("items.*.name").custom(async (name, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.items[index]._id;
    const product = await Product.findOne({ _id });
    if (product && product.name !== name) {
      throw new Error("Invalid product name.");
    }
  }),
  numberField("items.*.price").custom(async (price, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.items[index]._id;
    const product = await Product.findOne({ _id });
    if (product && product.price !== price) {
      throw new Error("Invalid product price.");
    }
  }),
  numberField("items.*.stock").custom(async (stock, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.items[index]._id;
    const product = await Product.findOne({ _id });
    if (product && product.stock !== stock) {
      throw new Error("Invalid product stock.");
    }
  }),
  numberField("items.*.qty").custom(async (qty, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.items[index]._id;
    const product = await Product.findOne({ _id });
    if (product && qty > product.stock) {
      throw new Error("Stock not enought.");
    }
  }),
  numberField("items.*.subtotal").custom(async (subtotal, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.items[index]._id;
    const product = await Product.findOne({ _id });
    if (product) {
      const calculateSubtotal = product.price * req.body.items[index].qty;
      if (calculateSubtotal !== subtotal) {
        throw new Error("Invalid subtotal.");
      }
    }
  }),
  numberField("total").custom(async (total, { req }) => {
    const items = req.body.items;
    let totalFromSubtotal = 0;
    for (let item of items) {
      totalFromSubtotal += item.subtotal;
    }

    if (total !== totalFromSubtotal) {
      throw new Error("Invalid total.");
    }
  }),
]);

module.exports = {
  orderValidationCreate,
  orderValidationNonFieldOwnership,
};
