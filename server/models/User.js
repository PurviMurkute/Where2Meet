import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    profile: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    lastUpdated: { type: Date },
    isLocationSharing: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;