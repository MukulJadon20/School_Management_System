import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  successfulLogins: { 
    type: Number, 
    default: 0 
  }
});

// Hash the password before saving the admin
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export const Admin = mongoose.model("Admin", adminSchema);

