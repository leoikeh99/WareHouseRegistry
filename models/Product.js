const mongoose = require("mongoose");

productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
