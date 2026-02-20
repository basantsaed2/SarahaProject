import { ProviderEnum } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/utils/response/error.responce.js";
import { createOne, findOne } from "../../database/database.service.js";
import { UserModel } from "../../database/index.js";

export const signup = async (data) => {
  const { userName, email, password, phone } = data;

  const userExist = await findOne({
    model: UserModel,
    filter: { email }
  });

  if (userExist) {
    return ConflictException({ message: "user is already exist" });
  }
  const user = await createOne({
    model: UserModel,
    data: { userName, email, password, phone }
  });

  return user;
};

export const login = async (data) => {
  const { email, password } = data;

  const userExist = await findOne({
    model: UserModel,
    filter: { email, password, provider: ProviderEnum.System },
    select: "-__v"
  });

  if (!userExist) {
    return NotFoundException({ message: "user is not exist" });
  }

  return userExist;
};
