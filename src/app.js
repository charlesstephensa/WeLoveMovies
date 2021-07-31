if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./errors/notFound");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theaterRouter = require("./theaters/theaters.router");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use("/movies", moviesRouter);
app.use("/reviews",  reviewsRouter);
app.use("/theaters", theaterRouter);

app.use(notFound);
module.exports = app;
