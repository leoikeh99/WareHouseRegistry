const mongoose = require("mongoose");

logSchema = mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    logType: {
      type: String,
      required: true,
    },
    products: [{ productName: String, amount: Number }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("logs", logSchema);
