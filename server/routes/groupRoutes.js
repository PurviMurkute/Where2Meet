import express from "express";
import verifyJwt from "../middlewares/jwt.js";
import { createGroupCode, getGroupMembersLocation, getGroupsByUser, joinGroupByCode, leaveGroup } from "../controllers/group.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyJwt, createGroupCode);

groupRouter.post("/join", verifyJwt, joinGroupByCode);
groupRouter.get('/groups', verifyJwt, getGroupsByUser);
groupRouter.get('/group-location/:code', verifyJwt, getGroupMembersLocation);
groupRouter.put('/group/:groupId', verifyJwt, leaveGroup);

export default groupRouter;