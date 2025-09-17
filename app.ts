const express = require("express");
// const dotenv = require("dotenv");

const userRoutes =  require("./routes/userRoutes");
const walletRoutes =  require("./routes/walletRoutes");


const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/wallet", walletRoutes);

module.exports = app;
