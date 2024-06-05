const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')
const {
  getAllCities,
  getCityById,
  postCity,
  deleteCity,
  // checkid,
  checkBody
} = require("./cityController");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const CitiesRoute = express.Router();

// CitiesRoute.param("id", checkid);
CitiesRoute.route("/").get(getAllCities).post(checkBody,postCity);
CitiesRoute.route("/:id").get(getCityById).delete(deleteCity);

app.use("/api/v1/cities", CitiesRoute);
app.use(CitiesRoute);
module.exports = app;
