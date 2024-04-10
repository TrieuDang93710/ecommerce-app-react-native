const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crupto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const uri =
  "mongodb+srv://trieudangdev1733:trieudbdev1733@cluster0.22e4v7l.mongodb.net/";
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const registerRouter = require("./route/userRoute");

//Connect
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res, req) => {
    console.log("Connected success");
  })
  .catch(() => {
    console.log("Disconnected Mongodb.");
  });

// Router
app.use("/v1/user", registerRouter);
// const router = require("./route/userRoute");
// router(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}: http://localhost:${port}`);
});
