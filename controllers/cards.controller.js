const {
  getAllCards,
  getCardInfo,
  createNewCard,
  deleteCard,
  updateCardInfo,
  createRandomCard,
  getCardWithObjectId,
} = require("../models/card/card.model");

async function httpGetAllCards(req, res) {
  try {
    const cards = await getAllCards();
    res.status(200).json({
      success: true,
      results: cards.length,
      data: cards,
    });
  } catch (error) {
    console.error("Error retrieving cards:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpGetCardInfo(req, res) {
  try {
    const card = await getCardInfo(req.params.cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        error: `Card with ID ${req.params.cardId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error(`Error retrieving card with ID ${req.params.cardId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpGetCardWithObjectId(req, res) {
  try {
    const card = await getCardWithObjectId(req.params.objId);

    if (!card) {
      return res.status(404).json({
        success: false,
        error: `Card with ID ${req.params.objId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error(`Error retrieving card with ID ${req.params.objId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpCreateNewCard(req, res) {
  try {
    const card = await createNewCard(req.body);

    res.status(201).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error("Error creating new card:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpCreateRandomCard(req, res) {
  try {
    const card = await createRandomCard(req.body);
    // const card = { name: "Aman" };
    // console.log("req.body", req.body);

    res.status(201).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error("Error creating new card:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpUpdateCardInfo(req, res) {
  try {
    const card = await updateCardInfo(req.params.cardId, req.body);

    if (!card) {
      return res.status(404).json({
        success: false,
        error: `Card with ID ${req.params.cardId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error(`Error updating card with ID ${cardId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpDeleteCard(req, res) {
  try {
    const card = await deleteCard(req.params.cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        error: `Card with ID ${req.params.cardId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error(`Error deleting card with ID ${req.params.cardId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = {
  httpGetAllCards,
  httpGetCardInfo,
  httpCreateNewCard,
  httpUpdateCardInfo,
  httpDeleteCard,
  httpCreateRandomCard,
  httpGetCardWithObjectId,
};
