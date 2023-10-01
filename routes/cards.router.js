const express = require("express");

const {
  httpGetAllCards,
  httpGetCardInfo,
  httpCreateNewCard,
  httpUpdateCardInfo,
  httpDeleteCard,
  httpCreateRandomCard,
  httpGetCardWithObjectId,
} = require("../controllers/cards.controller");

const cardRouter = express.Router();

cardRouter.get("/", httpGetAllCards);
cardRouter.post("/", httpCreateNewCard);
cardRouter.post("/random", httpCreateRandomCard);
cardRouter.get("/:cardId", httpGetCardInfo);
cardRouter.get("/object/:objId", httpGetCardWithObjectId);
cardRouter.put("/:cardId", httpUpdateCardInfo);
cardRouter.delete("/:cardId", httpDeleteCard);

module.exports = cardRouter;
