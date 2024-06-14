require("dotenv");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
console.log(PORT);

const indexRouter = require("./routes/index");
const UserRoutes = require("./routes/user/user.routes");
const PostRoutes = require("./routes/user/post.routes");
const AuthRoutes = require("./routes/user/auth.routes");
const SearchRoutes = require("./routes/user/search.routes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Enable CORS for all routes
app.use(cors());

app.use("/", indexRouter);
app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/search", SearchRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// connect db
if (process.env.NODE_ENV === "development") {
  mongoose.connect(process.env.MONGODB_DEV_URI, { useNewUrlParser: true });
  console.log("development db connected");
} else {
  mongoose.connect(process.env.MONGODB_PROD_URI, { useNewUrlParser: true });
  console.log("production db connected");
}

// port listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
