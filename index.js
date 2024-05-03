const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const Blog = require("./models/BlogModel");
const Products = require("./models/ProductListModel");
app.use(express.json());

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:5174",
    origin: "https://byfeyi.vercel.app/",
  })
);

process.on("UncaughtException", (err) => {
  console.log(err.message);
  console.log("UNCAUGHT EXCEPTION ... SHUTTING DOWN NOW!");
});

// dotenv.config({ path: "./Server/config.env" });
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB SUCCESSFULLY CONNECTED ✔😊"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`App is running on port ${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("UNHANDLED REJECTION! KINDLY CONNECT TO THE INTERNET!! 👀👀");

  server.close(() => process.exit(1));
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogContents = await Blog.findById(id);
    res.json(blogContents);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Products.findById(id);

    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

process.on("SIGTERM", function () {
  console.log("SIGTERM RECEIVED, Server Shutting Down Gracefully 😒");
  server.close(() => {
    console.log("Process Terminated!!🔥🔥");
  });
});
