const express = require("express");					// Makes exprtess server
const mongojs = require("mongojs");					// allows you to use MongoDB in VS Code
const logger = require("morgan");					// HTTP request logger
const path = require("path");						// allows __dirname path finction bellow
// let mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });