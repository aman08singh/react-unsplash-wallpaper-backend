const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/searchimage", async (req, res) => {
  console.log("Req is ", req.query);
  getData(
    req.query.search
      ? `${process.env.BASE_URL}/search/photos?query=${req.query.search}&xp=&per_page=${req.query.per_page}&page=${req.query.page}`
      : `${process.env.BASE_URL}/photos?page=${req.query.page}&per_page=${req.query.per_page}`
  )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400)(error.data);
    });
});

app.get("/searchimage", async (req, res) => {
  console.log("Req is ", req.query);
  getData()
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400)(error.data);
    });
});

async function getData(url) {
  return await axios.get(url);
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
