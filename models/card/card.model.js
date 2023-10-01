const Card = require("./card.mongo");
const Character = require("../character/character.mongo");

const {
  addCardToInventory,
  removeCardFromInventory,
} = require("../user/user.model");

const getAllCards = async () => {
  // populating character details as well
  return await Card.find({}, { __v: 0 })
    .lean()
    .populate("character", { _id: 0, __v: 0 });
};

const getCardInfo = async (cardId) => {
  // populating character details as well
  //   return Card.find().populate("characterId");
  return await Card.findOne({ cardId }, { __v: 0 })
    .lean()
    .populate("character", { _id: 0, __v: 0 });
};

const getCardWithObjectId = async (cardObjectId) => {
  return await Card.findOne(
    { _id: cardObjectId },
    { __v: 0, ownerId: 0, claimedBy: 0, claimedAt: 0 }
  );
};

const createNewCard = async (card) => {
  const { characterName, rarity, evo, ownerId, claimedBy, claimedAt, level } =
    card;
  const createdCard = new Card({
    characterName,
    rarity,
    evo,
    ownerId,
    claimedBy,
    claimedAt,
    level,
  });

  const newCard = await createdCard.save();

  // console.log("newCard", newCard);

  // Find the associated character and update copiesCount
  const character = await Character.findOneAndUpdate(
    { name: characterName }, // Find the character by characterId
    { $push: { copiesCount: newCard._id } }, // Push the new card's ID into copiesCount array
    { new: true } // Return the updated character document
  );

  // console.log("character", character);

  if (ownerId) {
    // Add the new card to the user's inventory
    await addCardToInventory(ownerId, newCard._id);
  }

  return newCard;
};

// to claim a random card
const createRandomCard = async ({ ownerId, claimedBy, server, channel }) => {
  //generate a random number between 1 and 22
  // total cards 22
  const random = Math.floor(Math.random() * 22);

  const random2 = Math.floor(Math.random() * 20) + 1;

  // getAllCharacters
  const characters = await Character.find({}, { __v: 0 });

  // get the character name
  const characterName = characters[random].name;

  // Randome inices for each rarity from 1 to 1000
  const ultraRareIndices = [451, 974, 14, 69, 333];
  const superRareIndices = [
    10, 250, 133, 347, 510, 169, 777, 891, 969, 2, 13, 253, 136, 350, 513, 172,
    780, 894, 972, 5, 16, 256, 139, 353, 516, 175, 783, 897, 975, 8, 19, 259,
    142, 356, 519, 178, 786, 900, 978, 11,
  ];
  const indices = [
    1, 1, 3, 1, 2, 2, 2, 2, 1, 1, 3, 3, 2, 1, 3, 3, 1, 2, 1, 1, 2, 2, 1, 1, 1,
    1, 1, 1, 2, 2, 1, 1, 3, 1, 2, 3, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1,
  ];

  let rarity;

  // Check if the random number is in the ultra rare indices
  let random3 = Math.floor(Math.random() * 1000);

  if (ultraRareIndices.includes(random3)) {
    rarity = "Ultra Rare";
  } else if (superRareIndices.includes(random3)) {
    rarity = "Super Rare";
  } else {
    random3 = Math.floor(Math.random() * indices.length);
    if (indices[random3] === 1) {
      rarity = "Common";
    } else if (indices[random3] === 2) {
      rarity = "Uncommon";
    } else {
      rarity = "Rare";
    }
  }

  // console.log("rarity", rarity);

  // Create the new card
  const newCard = await createNewCard({
    characterName: characterName,
    rarity: rarity,
    evo: 1,
    ownerId,
    claimedAt: {
      server,
      channel,
    },
    claimedBy,
    level: random2,
  });

  return newCard;
};

const updateCardInfo = async (cardId, card) => {
  const { characterName, rarity, evo, ownerId, level } = card;
  return await Card.findOneAndUpdate(
    { cardId },
    { $set: { characterName, rarity, evo, ownerId, level } },
    { new: true }
  );
};

const deleteCard = async (cardId) => {
  const cardToDelete = await Card.findByIdAndDelete(cardId);

  if (cardToDelete) {
    // Find the associated character
    const character = await Character.findOneAndUpdate(
      { name: cardToDelete.characterName },
      { $pull: { copiesCount: cardToDelete._id } },
      { new: true }
    );

    // Remove the card from the user's inventory
    if (cardToDelete.ownerId) {
      await removeCardFromInventory(cardToDelete.ownerId, cardToDelete._id);
    }
  }
  return cardToDelete;
};

module.exports = {
  getAllCards,
  getCardInfo,
  createNewCard,
  deleteCard,
  updateCardInfo,
  createRandomCard,
  getCardWithObjectId,
};
