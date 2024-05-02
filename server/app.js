const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const cors = require('cors');
app.use(cors());

// Check that all required .env variables exist
if (!process.env["ENVIRONMENT"]) {
  console.error(".env file missing required field \"ENVIRONMENT\".");
  process.exit(1);
} else if (!process.env["SQ_ACCESS_TOKEN"]) {
  console.error(".env file missing required field \"SQ_ACCESS_TOKEN\".");
  process.exit(1);
} else if (!process.env["SQ_LOCATION_ID"]) {
  console.error(".env file missing required field \"SQ_LOCATION_ID\".");
  process.exit(1);
}

const routes = require("./routes/index");
const { locationsApi } = require("./util/square-client");

// Get location information and store it in app.locals so it is accessible in all pages.
locationsApi.retrieveLocation(process.env["SQ_LOCATION_ID"]).then(function(response) {
  app.locals.location = response.result.location;
}).catch(function(error) {
  if (error.statusCode === 401) {
    console.error("Configuration has failed. Please verify `.env` file is correct.");
  }
  process.exit(1);
});


app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

module.exports = app;
  