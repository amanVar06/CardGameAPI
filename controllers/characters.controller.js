const {
  getAllCharacters,
  getCharacterById,
  getTotalCharactersCount,
  getFilteredCharactersData,
  getCharacterByName,
} = require("../models/character/character.model");

// const { getPagination } = require("../utils/query");

async function httpGetAllCharacters(req, res) {
  try {
    // console.log(req.query);
    // const {skip, limit} = getPagination(req.query);
    // const allCharacters = await getAllCharacters(skip, limit);
    // const totalCharacters = await getTotalCharactersCount();
    const characters = await getFilteredCharactersData(req.query);

    res.status(200).json({
      success: true,
      results: characters.length,
      data: characters,
    });
  } catch (error) {
    console.error("Error retrieving characters:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpGetCharacterById(req, res) {
  try {
    const character = await getCharacterById(req.params.characterId);

    if (!character) {
      return res.status(404).json({
        success: false,
        error: `Character with ID ${req.params.characterId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    console.error(`Error retrieving character with ID ${characterId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpGetCharacterByName(req, res) {
  try {
    const character = await getCharacterByName(req.params.name);

    if (!character) {
      return res.status(404).json({
        success: false,
        error: `Character with name ${req.params.name} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    console.error(`Error retrieving character with name ${name}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = {
  httpGetAllCharacters,
  httpGetCharacterById,
  httpGetCharacterByName,
};
