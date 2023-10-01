const {
  addCardToInventory,
  removeCardFromInventory,
  updateUserData,
} = require("../models/user/user.model");

async function httpClaimCard(req, res) {
  try {
    const { userId } = req.params;
    const { cardId } = req.body;

    await addCardToInventory(userId, cardId);

    res.status(200).json({
      success: true,
      message: `Card with ID ${cardId} successfully claimed`,
    });
  } catch (error) {
    console.error(`Error claiming card with ID ${cardId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = { httpClaimCard };
