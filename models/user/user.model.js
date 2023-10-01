const User = require("./user.mongo");
const UserAPIFilters = require("../../utils/userApiFilters");

const getAllUsers = async (skip, limit) => {
  return await User.find({}, { _id: 0, __v: 0 })
    .sort({ createdOn: 1 })
    .skip(skip)
    .limit(limit);
};

const getFilteredUsersData = async (queryObj) => {
  const apiFilters = new UserAPIFilters(
    User.find({}, { _id: 0, __v: 0 }),
    queryObj
  );
  apiFilters.sort();
  apiFilters.pagination();

  return await apiFilters.query;
};

const addNewUser = async (user) => {
  const { userId, userName } = user;
  return await User.create({ userId, userName });
};

const updateUserData = async (userId, user) => {
  const {
    userName,
    userStatus,
    gold,
    exp,
    level,
    cardSelected,
    diamonds,
    cardsClaimed,
  } = user;
  return await User.findOneAndUpdate(
    { userId },
    {
      $set: {
        userName,
        userStatus,
        gold,
        exp,
        level,
        cardSelected,
        diamonds,
        cardsClaimed,
      },
    },
    { new: true }
  );
};

const addCardToInventory = async (userId, cardId) => {
  return await User.findOneAndUpdate(
    { userId },
    { $push: { inventory: cardId } }
  );
};

const removeCardFromInventory = async (userId, cardId) => {
  return await User.findOneAndUpdate(
    { userId },
    { $pull: { inventory: cardId } }
  );
};

const getUserInventory = async (userId) => {
  const user = await User.findOne({ userId }, { _id: 0, __v: 0 });
  return user.inventory;
};

const deleteUserById = async (userId) => {
  return await User.findOneAndDelete({ userId });
};

const getTotalUsersCount = async () => {
  return await User.countDocuments();
};

// getUserById
const getUserWithId = async (userId) => {
  return await User.findOne({ userId }, { _id: 0, __v: 0 });
};

const checkUserExists = async (userId) => {
  return User.exists({ userId });
};

module.exports = {
  getAllUsers,
  getUserWithId,
  getTotalUsersCount,
  getFilteredUsersData,
  addNewUser,
  updateUserData,
  deleteUserById,
  addCardToInventory,
  removeCardFromInventory,
  checkUserExists,
  getUserInventory,
};
