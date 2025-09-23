import { Schema, model } from "mongoose";

const placesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    placeId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "cafe",
    },
    ratings: {
      type: String,
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

const Places = model("Places", placesSchema);

export default Places;
