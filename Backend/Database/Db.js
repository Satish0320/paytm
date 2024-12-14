const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Userschema = new Schema({
  email: { type: String, unique: true },
  password: String,
  username: String,
  name: String,
  accountId:{
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
});

const accountschema = new Schema({
  balance: { type: Number, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const usermodel = mongoose.model("User", Userschema);
const accountmodel = mongoose.model("Account", accountschema);

module.exports = {
  usermodel,
  accountmodel,
};
