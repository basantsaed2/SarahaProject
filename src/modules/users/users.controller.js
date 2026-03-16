import { Router } from "express";
import { auth, SuccessResponse } from "../../common/index.js";
import { getUserByShareProfileName, getUserProfile, shareProfileLink } from "./users.service.js";
const userRouter = Router();

userRouter.get("/get-user-profile", auth , async (req, res) => {
  let data = await getUserProfile(req.user?.id);
  SuccessResponse({ res, message: "User profile retrieved successfully", data });
});

userRouter.get("/share-profile-link", auth , async (req, res) => {
  let data = await shareProfileLink(req.user?.id);
  SuccessResponse({ res, message: "Profile link shared successfully", data });
});

userRouter.get("/get-user-data", async (req, res) => {
  let data = await getUserByShareProfileName(req.body);
  SuccessResponse({ res, message: "User profile retrieved successfully", data });
});

export default userRouter;