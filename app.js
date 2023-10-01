const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const path = require("path");
const dexRouter = require("./routes/characters.router");
const userRouter = require("./routes/users.router");
const cardRouter = require("./routes/cards.router");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/characters", dexRouter);
app.use("/api/users", userRouter);
app.use("/api/cards", cardRouter);

module.exports = app;
