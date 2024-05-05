const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("../models/BlogModel");
const Products = require("../models/ProductListModel");

// dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./Server/config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB SUCESSFULLY CONNECTED!"));

// const blogs = JSON.parse(fs.readFileSync(`${__dirname}/blogs.json`, `utf-8`));
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/blogs.json`, `utf-8`));

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/productListData.json`, "utf-8")
);

const importData = async function () {
  try {
    await Blog.create(blogs);
    await Products.create(products);
    console.log("Data sucessfully imported 😊👌!");
  } catch (err) {
    console.log(
      "An error occured while trying to import data 😞☹! Kindly connect to your internet! "
    );
  }
  process.exit(1);
};

const deleteData = async function () {
  try {
    await Blog.deleteMany();
    await Products.deleteMany();
    console.log("Data successfully Deleted ❌💯!");
  } catch (err) {
    console.log(
      "Failed to delete data! Kindly check your internet connection 😪"
    );
    console.log(err);
  }
  process.exit(1);
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
