const { default: mongoose } = require("mongoose");

const productObject = {
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true, min: 1 },
  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const productSchema = new mongoose.Schema(productObject, {
  versionKey: false,
  timestamps: true,
});

const Product = new mongoose.model("Product", productSchema);

module.exports = {
  Product,
  productObject,
  productSchema,
};
