import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  email: String,
  password: String,
  successfulLogins: { type: Number, default: 0 }
});

export const Admin = mongoose.model("Admin", adminSchema);
