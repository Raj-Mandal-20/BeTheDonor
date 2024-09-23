const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const authRouter = require("./routes/auth");
const feedRouter = require("./routes/feed");
const clsReqAfterDeadline = require('./Corn/clsReqAfterDeadline');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else cb(null, false);
};


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static('public'));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRouter);

app.use("/v1", feedRouter);

app.use("/", (req, res, next) => {
  res.send("Hack4Bengal API");
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message,
    statusCode: status,
  });
});

mongoose.connect(process.env.DATABASE_URL).then(() => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT ${process.env.PORT} 🚀`);
  });
  const rule = {
    cors: {
      origin: "*",
    },
  };
  const io = require("./socket").init(server, rule);
  io.on("connection", (socket) => {
    console.log("New Client Connected ✅☑️");
  });
});
