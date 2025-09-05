import express from "express";
import verifyJwt from "../middlewares/jwt.js";
import { createGroupCode, joinGroupByCode } from "../controllers/group.js";

const groupRouter = express.Router();

groupRouter.post("/create", verifyJwt, createGroupCode);

groupRouter.post("/join", verifyJwt, joinGroupByCode);

export default groupRouter;