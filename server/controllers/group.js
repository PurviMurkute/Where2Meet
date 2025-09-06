import crypto from "crypto";
import Group from "../models/Group.js";

const createGroupCode = async (req, res) => {
  const { groupName, description } = req.body;
  if (!groupName) {
    return res.status(400).json({ message: "Group name is required" });
  }

  try {
    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const newGroup = new Group({
      groupName,
      description,
      code,
      members: [{ userId: req.user._id }],
    });
    const savedGroup = await newGroup.save();

    return res.status(201).json({
      success: true,
      data: savedGroup,
      message: "Group created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const joinGroupByCode = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Group code is required",
    });
  }

  try {
    const group = await Group.findOne({ code });
    if (!group) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Invalid Group Code",
      });
    }

    if (
      !group.members.some((member) => member.userId.toString() === req.user._id)
    ) {
      group.members.push({ userId: req.user._id });
      await group.save();
    }

    return res.status(200).json({
      success: true,
      data: group,
      message: "Joined group successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const getGroupsByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const groups = await Group.find({ "members.userId": userId })
      .populate("members.userId", "username email")
      .sort({ createdAt: -1 });

    if (!groups) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "You have not joined or created any groups yet",
      });
    }
    return res.status(200).json({
      success: true,
      data: groups,
      message: "Groups fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

export { createGroupCode, joinGroupByCode, getGroupsByUser };
