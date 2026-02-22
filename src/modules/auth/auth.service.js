import { ProviderEnum } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/response/error.responce.js";
import { createOne, findOne, findById } from "../../database/database.service.js";
import { UserModel } from "../../database/index.js";
// import * as argon2 from "argon2";
import { hashPassword, comparePassword } from "../../common/index.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
import fs from "fs";

// const private_key = fs.readFileSync("./private.key", "utf-8");

export const signup = async (data) => {
  const { userName, email, password, phone, role } = data;

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
    data: { userName, email, password: hashedPassword, phone, role }
  });

  return user;
};

export const login = async (data, host) => {
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

  let signature = undefined;
  let audience = undefined;
  switch (userExist.role) {
    case "0":
      signature = env.AdminSignature;
      audience = "Admin";
      break;
    default:
      signature = env.UserSignature;
      audience = "User";
  }

  const token = await jwt.sign({ id: userExist._id }, signature, {
    expiresIn: env.JWT_EXPIRES_IN,
    notBefore: "30s",
    issuer: host,   // who issue the token 
    audience
  });

  // const token = await jwt.sign({ id: userExist._id }, private_key, { algorithm: "RS256", expiresIn: env.JWT_EXPIRES_IN, notBefore: "30s", issuer: host, audience });

  return { userExist, token };
};

export const getUserById = async (user) => {

  const userExist = await findById({ model: UserModel, id: user?.id, select: "-__v" });

  if (!userExist) {
    return NotFoundException({ message: "user is not exist" });
  }

  return userExist;
}
