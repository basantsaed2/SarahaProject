import { findById, findOne, updateOne, deleteOne } from "../../database/index.js";
import { UserModel } from "../../database/models/users.model.js";
import { env } from "../../../config/env.service.js";
import { BadRequestException } from "../../common/index.js";
import { get, set, update } from "../../database/redis.service.js";

export const getRedisKey = (userId) => {
  return `userProfile::${userId}`;
}

export const getUserProfile = async (userId) => {
  let redisKey = getRedisKey(userId);
  let user = await get(redisKey);
  if (user) {
    return user;
  }
  user = await findById({
    model: UserModel,
    id: userId,
    select: "firstName lastName email shareProfileName",
  });
  if (!user) {
    throw BadRequestException({ message: "User not found" });
  } else {
    await set({ key: getRedisKey(userId), value: user, ex: 60 * 60 * 24 });
    return user;
  }
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

export const UpdateUserProfile = async (userId, data, file) => {

  let updateData = { ...data };

  if (file) {
    const pathFromUpload = `${file.destination}/${file.filename}`.replace(/\\/g, "/");
    const relativePath = pathFromUpload.includes("uploads")
      ? pathFromUpload.substring(pathFromUpload.indexOf("uploads"))
      : pathFromUpload;
    updateData.image = `${env.base_url}/${relativePath}`;
  }

  const existingUser = await updateOne({
    model: UserModel,
    filter: { _id: userId },
    update: updateData
  });

  if (!existingUser) {
    throw BadRequestException({ message: "User not found" });
  } else {
    // await del({ key: getRedisKey(userId) });
    await update({ key: getRedisKey(userId), value: existingUser, ex: 60 * 60 * 24 });
    return existingUser;
  }

}

export const deleteUser = async (userId) => {
  const deletedUser = await deleteOne({
    model: UserModel,
    filter: { _id: userId }
  });

  if (!deletedUser) {
    throw BadRequestException({ message: "User not found" });
  }

  return deletedUser;
};
