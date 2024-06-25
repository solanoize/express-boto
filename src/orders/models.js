const { default: mongoose } = require("mongoose");
const { productObject } = require("../products/models");

const orderObject = {
  nomor: { type: String, required: true, unique: true },
  total: { type: Number, default: 0, required: true },
  tanggal: { type: Date, default: new Date(), required: true },
  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      ...productObject,
      qty: { type: Number, default: 1, required: true },
      subtotal: { type: Number, min: 1, required: true },
    },
  ],
};

const orderSchema = new mongoose.Schema(orderObject, {
  versionKey: false,
  timestamps: true,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  orderSchema,
  orderObject,
};
