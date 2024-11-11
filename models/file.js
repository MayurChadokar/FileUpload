const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tag: { type: String, required: true },
  imageURL: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
