import { decodeRefreshToken, decodeToken, generateToken, ProviderEnum } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/index.js";
import { createOne, findOne, findById } from "../../database/database.service.js";
import { UserModel } from "../../database/index.js";
import { hashPassword, comparePassword } from "../../common/index.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
import { OAuth2Client } from 'google-auth-library';

export const signup = async (data , file ) => {
  const { userName, email, password, phone, role , shareProfileName } = data;

  const userExist = await findOne({
    model: UserModel,
    filter: { email }
  });

  if (userExist) {
    return ConflictException({ message: "user is already exist" });
  }

  let image = '';

  if (file) {
    image = `${env.base_url}/${file.destination}/${file.filename}`;
  }

  console.log(image);

  const hashedPassword = await hashPassword(password);
  const user = await createOne({
    model: UserModel,
    data: { userName, email, password: hashedPassword, phone, role, shareProfileName, image }
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

  if (!userExist || !isMatch) {
    return NotFoundException({ message: "user is not exist" });
  }

  if (isMatch) {
    const { accessToken, refreshToken } = await generateToken(userExist);
    return { userExist, accessToken, refreshToken };
  }
};

export const getUserById = async (user) => {

  const userExist = await findById({ model: UserModel, id: user?.id, select: "-__v" });

  if (!userExist) {
    return NotFoundException({ message: "user is not exist" });
  }

  return userExist;
}

export const generateRefreshToken = async (token) => {
  const decodedToken = await decodeRefreshToken(token);

  let signature = undefined;
  let audience = undefined;

  switch (decodedToken.aud) {
    case "Admin":
      signature = env.AdminSignature;
      audience = "Admin";
      break;
    default:
      signature = env.UserSignature;
      audience = "User";
  }

  const accessToken = await jwt.sign({ id: decodedToken.id }, signature, {
    expiresIn: env.JWT_EXPIRES_IN,
    audience
  });

  return accessToken;

}

export const signupGoogle = async (data) => {

  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: data.idToken,
    audience: env.WEB_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload.email_verified) {
    return UnauthorizedException({ message: "user is not verified" });
  }

  const userExist = await findOne({
    model: UserModel,
    filter: { email: payload.email, provider: ProviderEnum.Google },
    select: "-__v"
  });

  if (userExist) {
    return ConflictException({ message: "user is already exist" });
  }

  const user = await createOne({
    model: UserModel,
    data: { userName: payload.name, email: payload.email, provider: ProviderEnum.Google }
  });

  return user;

};


