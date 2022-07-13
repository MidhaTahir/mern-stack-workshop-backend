const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const reviewRoute = require("./routes/reviewRoute");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//test route
app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/reviews", reviewRoute);

// This will handle 404 requests.
app.use("*", function (req, res) {
  res.status(404).send("404");
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server has started to run on ${port}`));
