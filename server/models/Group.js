import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    description: {
        type: String
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    meetingPoint: {
      latitude: Number,
      longitude: Number,
      placeName: String,
    },
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", groupSchema);

export default Group;
