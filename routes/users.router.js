const express = require("express");

const {
  httpCreateUser,
  httpDeleteUserById,
  httpGetAllUsers,
  httpGetUserById,
  httpUpdateUserById,
} = require("../controllers/users.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUsers);
userRouter.post("/", httpCreateUser);
userRouter.get("/:userId", httpGetUserById);
userRouter.put("/:userId", httpUpdateUserById);
userRouter.delete("/:userId", httpDeleteUserById);

module.exports = userRouter;
