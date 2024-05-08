const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  titleBreak: String,
  date: String,
  projectType: String,
  tools: String,
  image: String,
  imageCover: [String],
  description: String,
  tool: String,
  desc: String,
  details: String,
  dat: String,
  clothing: String,
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
