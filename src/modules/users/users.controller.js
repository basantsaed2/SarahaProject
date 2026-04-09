import { Router } from "express";
import { auth, SuccessResponse, validate } from "../../common/index.js";
import { multer_local } from "../../common/middleware/multer.js";
import { extensionMap } from "../../common/extension/extensions.js";
import { updateUserSchema } from "./users.validation.js";
import {
  getUserByShareProfileName,
  getUserProfile,
  shareProfileLink,
  UpdateUserProfile,
  deleteUser,
} from "./users.service.js";
const userRouter = Router();

userRouter.get("/get-user-profile", auth, async (req, res) => {
  let data = await getUserProfile(req.user?.id);
  SuccessResponse({
    res,
    message: "User profile retrieved successfully",
    data,
  });
});

userRouter.get("/share-profile-link", auth, async (req, res) => {
  let data = await shareProfileLink(req.user?.id);
  SuccessResponse({ res, message: "Profile link shared successfully", data });
});

userRouter.get("/get-user-data", async (req, res) => {
  let data = await getUserByShareProfileName(req.body);
  SuccessResponse({
    res,
    message: "User profile retrieved successfully",
    data,
  });
});

userRouter.put(
  "/update-user",
  multer_local({
    customPath: "users/profileImages",
    allowedExtensions: extensionMap.image,
  }).single("image"),
  auth,
  validate(updateUserSchema),
  async (req, res) => {
    let data = await UpdateUserProfile(req.user?.id, req.body, req.file);
    SuccessResponse({
      res,
      message: "User profile updated successfully",
      data,
    });
  },
);

userRouter.delete("/delete-user", auth, async (req, res) => {
  let data = await deleteUser(req.user?.id);
  SuccessResponse({ res, message: "User profile deleted successfully", data });
});

export default userRouter;
