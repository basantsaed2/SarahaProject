import { findById, findOne } from "../../database/index.js";
import { UserModel } from "../../database/models/users.model.js";
import { env } from "../../../config/env.service.js";
import { BadRequestException } from "../../common/index.js";
import e from "express";

export const getUserProfile = async (userId) => {
  let user = await findById({
    model: UserModel,
    id: userId,
    select: "firstName lastName email shareProfileName",
  });
  if (!user) {
    throw BadRequestException({ message: "User not found" });
  }
  return user;
};

export const shareProfileLink = async (userId) => {
  const user = await getUserProfile(userId);
  const url = `${env.base_url}/${user?.shareProfileName}`;
  return url;
};

export const getUserByShareProfileName = async (data) => {
  const { shareProfileName } = data;
  const userName = shareProfileName.split("/")[3];

  if (!shareProfileName) {
    throw BadRequestException({ message: "shareProfileName is required" });
  }
  const user = await findOne({
    model: UserModel,
    filter: { shareProfileName: userName },
    select: "firstName lastName email",
  });

  if (!user) {
    throw BadRequestException({ message: "User not found" });
  }
  return user;
};
