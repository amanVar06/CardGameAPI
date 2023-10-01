const fs = require("fs");
const path = require("path");

const Character = require("../models/character/character.mongo");

const importCharacters = async () => {
  try {
    const charactersDataPath = path.join(
      __dirname,
      "..",
      "data",
      "characters.json"
    );

    // Read character data from the JSON file
    const charactersData = JSON.parse(fs.readFileSync(charactersDataPath));

    // Sort charactersData array by name
    charactersData.sort((a, b) => a.name.localeCompare(b.name));

    // Use bulk operations for better performance
    const bulkOps = charactersData.map((character, index) => {
      const {
        name,
        animeSeries,
        HP,
        ATK,
        DEF,
        SPD,
        talent,
        type,
        quote,
        imgUrl,
      } = character;

      return {
        updateOne: {
          filter: { name },
          update: {
            $set: {
              characterId: index + 1,
              name,
              animeSeries,
              HP,
              ATK,
              DEF,
              SPD,
              talent,
              type,
              quote,
              imgUrl,
            },
          },
          upsert: true,
        },
      };
    });

    // Execute the bulk operations
    await Character.bulkWrite(bulkOps);
    console.log("Characters imported successfully");
  } catch (error) {
    console.error("Error importing characters", error);
  }
};

module.exports = { importCharacters };

/**
 * async function loadCharactersData() {
  return new Promise((resolve, reject) => {
    try {
      const charactersDataPath = path.join(
        __dirname,
        "..",
        "data",
        "characters.json"
      );

      // Read character data from the JSON file
      const charactersData = JSON.parse(fs.readFileSync(charactersDataPath));

      // Sort charactersData array by name
      charactersData.sort((a, b) => a.name.localeCompare(b.name));

      //   console.log(charactersData);

      // Use bulk operations for better performance
      charactersData.forEach((character, index) => {
        saveCharacter(character, index + 1);
      });

      console.log("Characters imported successfully");
      resolve();
    } catch (error) {
      console.error("Error importing characters", error);
      reject(error);
    }
  });
}

async function saveCharacter(character, characterId) {
  const {
    name,
    animeSeries,
    HP,
    ATK,
    DEF,
    SPD,
    talent,
    type,
    quote,
    imageUrl,
  } = character;

  try {
    await Character.updateOne(
      {
        name,
      },
      {
        $set: {
          characterId,
          name,
          animeSeries,
          HP,
          ATK,
          DEF,
          SPD,
          talent,
          type,
          quote,
          imageUrl,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save the character ${err}`);
  }
}
 */
