const mongoose = require("mongoose");

employeeSchema = mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employees", employeeSchema);
