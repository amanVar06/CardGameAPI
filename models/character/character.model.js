const Character = require("./character.mongo");
const DexAPIFilters = require("../../utils/dexApiFilters");

const getAllCharacters = async (skip, limit) => {
  return await Character.find({}, { _id: 0, __v: 0 })
    .sort({ characterId: 1 })
    .skip(skip)
    .limit(limit);
};

const getFilteredCharactersData = async (queryObj) => {
  const apiFilters = new DexAPIFilters(
    Character.find({}, { _id: 0, __v: 0 }),
    queryObj
  );
  apiFilters.sort();
  apiFilters.searchByName();
  apiFilters.searchBySeries();
  apiFilters.searchByTalent();
  apiFilters.searchByType();
  // apiFilters.pagination(); // pagination on frontend for now which is better
  // pagination total results issue -- need to fix (currently doing at front end)

  return await apiFilters.query;
};

const getCharacterById = async (characterId) => {
  return await Character.findOne({ characterId }, { _id: 0, __v: 0 });
};

const getTotalCharactersCount = async () => {
  return await Character.countDocuments();
};

const getCharacterByName = async (name) => {
  // const regex = new RegExp(`^${name}`, "i");
  return await Character.findOne(
    { name: { $regex: new RegExp(`\\b${name}\\b`, "i") } },
    { _id: 0, __v: 0 }
  );
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  getTotalCharactersCount,
  getFilteredCharactersData,
  getCharacterByName,
};
