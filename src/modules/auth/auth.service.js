import { ProviderEnum } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/utils/response/error.responce.js";
import { createOne, findOne, findById } from "../../database/database.service.js";
import { UserModel } from "../../database/index.js";
// import * as argon2 from "argon2";
import { hashPassword, comparePassword } from "../../common/index.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";

export const signup = async (data) => {
  const { userName, email, password, phone } = data;

  const userExist = await findOne({
    model: UserModel,
    filter: { email }
  });

  if (userExist) {
    return ConflictException({ message: "user is already exist" });
  }

  const hashedPassword = await hashPassword(password);
  // const hashPassword = await argon2.hash(password);
  const user = await createOne({
    model: UserModel,
    data: { userName, email, password: hashedPassword, phone }
  });

  return user;
};

export const login = async (data) => {
  const { email, password } = data;

  const userExist = await findOne({
    model: UserModel,
    filter: { email, provider: ProviderEnum.System },
    select: "-__v"
  });

  const isMatch = await comparePassword(password, userExist.password);
  // const isMatch = await argon2.verify(userExist.password, password);


  if (!userExist || !isMatch) {
    return NotFoundException({ message: "user is not exist" });
  }

  const token = await jwt.sign({ id: userExist._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return { userExist, token };
};

export const getUserById = async (token) => {

  if (!token) {
    return NotFoundException({ message: "token is not exist" });
  }

  const decodedToken = await jwt.verify(token, env.JWT_SECRET);

  const user = await findById({ model: UserModel, id: decodedToken.id, select: "-__v" });

  if (!user) {
    return NotFoundException({ message: "user is not exist" });
  }

  return user;
}
