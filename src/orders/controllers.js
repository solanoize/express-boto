const { exceptionHandler, Error404 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { buildPagination } = require("../utils/paginations");
const { Order } = require("./models");
const { orderValidationNonFieldOwnership } = require("./validations");

const orderControllerList = async (req, res) => {
  try {
    let result = Order.find({ owner: res.locals.user._id, isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const orderControllerCreate = async (req, res) => {
  try {
    await orderValidationNonFieldOwnership(res);
    const result = await Order.create({
      ...res.locals.matchedData,
      owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const orderControllerDetail = async (req, res) => {
  try {
    let result = await Order.findOne({
      _id: req.params.id,
      owner: res.locals.user._id,
      isDelete: false,
    });
    if (!result) {
      throw new Error404();
    }

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  orderControllerList,
  orderControllerCreate,
  orderControllerDetail,
};
