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
});

export const Admin = mongoose.model("Admin", adminSchema);
