const { exceptionHandler, Error404, Error403 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { buildPagination } = require("../utils/paginations");
const { Product } = require("./models");

const productControllerList = async (req, res) => {
  try {
    let result = Product.find({ owner: res.locals.user._id, isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerCreate = async (req, res) => {
  try {
    const result = await Product.create({
      ...res.locals.matchedData,
      owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerDetail = async (req, res) => {
  try {
    const result = await Product.findOne({
      _id: req.params.id,
      isDelete: false,
    });

    if (!result) {
      throw new Error404();
    }

    if (result.owner._id.toString() !== res.locals.user._id.toString()) {
      throw new Error403();
    }

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerUpdate = async (req, res) => {
  try {
    let result = await Product.findOne({
      _id: req.params.id,
      isDelete: false,
    });
    if (!result) {
      throw new Error404();
    }

    if (result.owner._id.toString() !== res.locals.user._id.toString()) {
      throw new Error403();
    }

    result = await Product.findOneAndUpdate(
      { _id: req.params.id },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerDelete = async (req, res) => {
  try {
    const result = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: res.locals.user._id,
        isDelete: false,
      },
      { isDelete: true }
    );

    if (!result) {
      throw new Error404();
    }

    return res.status(204).json(null);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  productControllerList,
  productControllerCreate,
  productControllerDetail,
  productControllerUpdate,
  productControllerDelete,
};
