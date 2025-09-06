import express from "express";
import verifyJwt from "../middlewares/jwt.js";
import { createGroupCode, getGroupsByUser, joinGroupByCode } from "../controllers/group.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyJwt, createGroupCode);

groupRouter.post("/join", verifyJwt, joinGroupByCode);
groupRouter.get('/groups', verifyJwt, getGroupsByUser);

export default groupRouter;