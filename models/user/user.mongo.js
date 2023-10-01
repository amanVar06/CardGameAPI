const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true }, //discordId
  userName: { type: String, required: true },
  userStatus: { type: String, default: "A new Animine Player..." },
  level: { type: Number, required: true, default: 1 },
  exp: { type: Number, required: true, default: 0 },
  cardSelected: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  gold: { type: Number, required: true, default: 5000 },
  diamonds: { type: Number, required: true, default: 250 },
  cardsClaimed: { type: Number, default: 0 },
  createdOn: { type: Date, required: true, default: Date.now },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
