const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
