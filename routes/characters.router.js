const express = require("express");

const {
  httpGetAllCharacters,
  httpGetCharacterById,
  httpGetCharacterByName,
} = require("../controllers/characters.controller");

const dexRouter = express.Router();

dexRouter.get("/", httpGetAllCharacters);
dexRouter.get("/:characterId", httpGetCharacterById);
dexRouter.get("/name/:name", httpGetCharacterByName);

module.exports = dexRouter;
