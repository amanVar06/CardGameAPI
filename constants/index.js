const fs = require("fs");
const path = require("path");

const ANIME_SERIES = [
  "Naruto",
  "Attack on Titan",
  "Dragon Ball Z",
  "One Piece",
  "Bleach",
  "Code Geass",
  "Fullmetal Alchemist",
  "Hunter x Hunter",
  "One Punch Man",
  "Fairy Tail",
  "Classroom of the Elite",
  "Death Note",
];

const TALENTS = [
  "Overload",
  "Trick Room",
  "Temporal Rewind",
  "Executioner",
  "Pain For Power",
  "Blood Surge",
  "Time Attack",
  "Recoil",
  "Regeneration",
  "Berserker",
  "Poison",
];

const TYPES = [
  "fire",
  "electric",
  "water",
  "grass",
  "ground",
  "shadow",
  "light",
  "neutral",
];

const getCharactersData = () => {
  const charactersDataPath = path.join(
    __dirname,
    "..",
    "data",
    "characters.json"
  );

  // Read character data from the JSON file
  const charactersData = JSON.parse(fs.readFileSync(charactersDataPath));

  return charactersData;
};

const CHARACTER_NAMES = getCharactersData().map((character) => character.name);

module.exports = {
  ANIME_SERIES,
  TALENTS,
  TYPES,
  CHARACTER_NAMES,
};
