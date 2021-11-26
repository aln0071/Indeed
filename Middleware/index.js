/* eslint-disable */
// const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const UserRegistration = require("./src/routes/registration/UserRegistration");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const review = require("./src/routes/reviews/Reviews");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// var corsOptions = {  //eslint-disable-line
//     origin: "http://localhost:3000" //eslint-disable-line
//   }; //eslint-disable-line

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("connected");
// })

app.use("/indeed/api", review);
app.use("/indeed/user", UserRegistration);

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 3003;

app.listen(3003, () => {
  console.log(`Running on port ${PORT}`); //eslint-disable-line
});

module.exports = app;
