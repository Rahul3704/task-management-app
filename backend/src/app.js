const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.use(errorHandler);

module.exports = app;