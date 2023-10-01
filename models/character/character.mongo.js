const mongoose = require("mongoose");

const {
  ANIME_SERIES,
  TALENTS,
  TYPES,
  CHARACTER_NAMES,
} = require("../../constants/index");

// Define the schema for the Character model
const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: CHARACTER_NAMES,
    required: true,
    unique: true,
  },
  characterId: {
    type: Number,
    required: true,
    unique: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  animeSeries: {
    type: String,
    enum: ANIME_SERIES,
    required: true,
  },
  HP: {
    type: Number,
    required: true,
  },
  ATK: {
    type: Number,
    required: true,
  },
  DEF: {
    type: Number,
    required: true,
  },
  SPD: {
    type: Number,
    required: true,
  },
  talent: {
    type: String,
    enum: TALENTS,
    required: true,
  },
  type: {
    type: String,
    enum: TYPES,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  copiesCount: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

// Create the Character model
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
