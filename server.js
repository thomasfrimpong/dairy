const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
const cookieParser = require("cookie-parser");

//Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

connectDB();

const PORT = process.env.PORT;

//Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

//Error Handler Middleware
app.use(errorHandler);

server = app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`.magenta);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled error: ${err.message} `.red);
  server.close(() => {
    process.exit(1);
  });
});
