const {
  getAllUsers,
  getUserWithId,
  getFilteredUsersData,
  checkUserExists,
  addNewUser,
  updateUserData,
  deleteUserById,
  getUserInventory,
} = require("../models/user/user.model");

const { getPagination } = require("../utils/query");

async function httpGetAllUsers(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const users = await getAllUsers(skip, limit);

    res.status(200).json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving characters:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpGetUserById(req, res) {
  try {
    const user = await getUserWithId(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${req.params.userId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(`Error retrieving user with ID ${userId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpCreateUser(req, res) {
  try {
    const { userId } = req.body;

    const findUser = await checkUserExists(userId);
    console.log("Found user:", findUser);

    if (findUser) {
      return res.status(400).json({
        success: false,
        error: `User with ID ${userId} already exists`,
      });
    }

    const newUser = await addNewUser(req.body);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpUpdateUserById(req, res) {
  try {
    const user = await updateUserData(req.params.userId, req.body);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${req.params.userId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function httpDeleteUserById(req, res) {
  try {
    const user = await deleteUserById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${req.params.userId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = {
  httpCreateUser,
  httpDeleteUserById,
  httpGetAllUsers,
  httpGetUserById,
  httpUpdateUserById,
};
