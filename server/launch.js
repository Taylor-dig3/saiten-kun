const express = require("express");
const { setupServer } = require("./server.js");
require("dotenv").config();

const app = setupServerMock();
// app.use("/", express.static(__dirname + "/../build"));

const SERVER_PORT = process.env.SERVER_PORT || 4000;

app.listen(SERVER_PORT, () => {
  console.log("Server running on port", SERVER_PORT);
});
