import Group from "../models/Group.js";
import Places from '../models/Places.js';
import axios from "axios";

const getPlaces = async (req, res) => {
  const { groupCode } = req.params;
  const { category } = req.body;

  try {
    const group = await Group.findOne({ code: groupCode }).populate(
      "members.userId",
      "location username"
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Group not found",
      });
    }

    const membersLocations = group.members
      .filter(
        (member) =>
          member?.userId?.location?.latitude &&
          member?.userId?.location?.longitude
      )
      .map((member) => member.userId.location);

    if (membersLocations.length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "No members' locations found",
      });
    }

    const avgLat =
      membersLocations.reduce((sum, loc) => sum + loc.latitude, 0) /
      membersLocations.length;
    const avgLng =
      membersLocations.reduce((sum, loc) => sum + loc.longitude, 0) /
      membersLocations.length;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${avgLat},${avgLng}`,
          radius: 3000,
          type: category,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const rawPlaces = response.data.results
      .filter(
        (place) =>
          place &&
          place.name &&
          place.place_id &&
          place.rating !== undefined &&
          place.geometry?.location
      )
      .map((place) => ({
        name: place.name,
        placeId: place.place_id,
        ratings: place.rating,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        groupCode,
      }));

    // Optional: Clean old places for the group before saving new ones
    await Places.deleteMany({ groupCode });

    // Save all places to MongoDB
    const savedPlaces = await Places.insertMany(rawPlaces);

    return res.status(200).json({
      success: true,
      data: savedPlaces,
      message: "Places fetched and saved successfully",
    });
  } catch (error) {
    console.error("Error fetching/saving places:", error.message);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Server error while fetching places",
    });
  }
};

export default getPlaces;