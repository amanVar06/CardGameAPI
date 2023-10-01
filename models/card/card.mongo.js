const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardId: { type: Number, unique: true },
  characterName: { type: String, required: true },
  rarity: {
    type: String,
    enum: ["Common", "Uncommon", "Rare", "Super Rare", "Ultra Rare"],
    required: true,
  },
  evo: { type: Number, enum: [1, 2, 3], required: true },
  ownerId: {
    type: String, // discordId
  },
  claimedBy: { type: String }, // discordId
  claimedAt: {
    server: { type: String },
    channel: { type: String },
  },
  level: {
    type: Number,
    validate: {
      validator: function (value) {
        const rarityMaxLevels = {
          Common: 20,
          Uncommon: 30,
          Rare: 40,
          "Super Rare": 50,
          "Ultra Rare": 60,
        };
        return value >= 1 && value <= rarityMaxLevels[this.rarity];
      },
      message: "Invalid card level",
    },
    required: true,
  },
});

cardSchema.pre("save", async function (next) {
  try {
    // Get the last cardId from the database
    const lastCard = await Card.findOne().sort({ cardId: -1 });
    // const lastCard = await Card.findOne({}, { cardId: 1 })
    //   .sort({ cardId: -1 })
    //   .limit(1);

    // Generate the new cardId
    const newCardId = lastCard ? lastCard.cardId + 1 : 1;

    // Set the new cardId
    this.cardId = newCardId;

    next();
  } catch (error) {
    next(error);
  }
});

// cardSchema.virtual("character", {
//   ref: "Character",
//   localField: "characterId",
//   foreignField: "characterId",
// });

// Define the virtual field to populate character data
cardSchema.virtual("character", {
  ref: "Character", // The target model to populate (Character model)
  localField: "characterName", // The field in the Card model that establishes the relationship
  foreignField: "name", // The field in the Character model that establishes the relationship
  justOne: true, // Set to true since each card corresponds to one character
});

// Make sure to call `toObject()` or `toJSON()` when using virtuals with `lean()`
cardSchema.set("toObject", { virtuals: true });
cardSchema.set("toJSON", { virtuals: true });

// Create the Card model
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
