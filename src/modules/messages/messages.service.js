import { BadRequestException } from "../../common/utils/response/error.responce.js";
import {
  createOne,
  deleteOne,
  find,
  findById,
  findOne,
} from "../../database/database.service.js";
import { UserModel } from "../../database/index.js";
import { MessageModel } from "../../database/models/messages.model.js";

export const sendMessage = async (messageData, receverId) => {
  const existUser = await findById({ model: UserModel, id: receverId });
  if (!existUser) {
    throw BadRequestException({ message: "Recever user not found" });
  }
  try {
    const { message, date, image } = messageData;
    const newMessage = await createOne({
      model: MessageModel,
      data: {
        message,
        receverId,
        date,
        image,
      },
    });
    return newMessage;
  } catch (error) {
    throw BadRequestException({
      message: "Failed to send message",
      extra: error,
    });
  }
};

export const getAllMessages = async (userId) => {
  const existUser = await findById({ model: UserModel, id: userId });
  if (!existUser) {
    throw BadRequestException({ message: "User not found" });
  }
  const messages = await find({
    model: MessageModel,
    filter: { receverId: userId },
  });
  if (!messages || messages.length === 0) {
    throw BadRequestException({ message: "No messages found for this user" });
  }
  return messages;
};

export const getMessagesById = async (userId, messageId) => {

  const message = await findOne({
    model: MessageModel,
    filter: { _id: messageId, receverId: userId },
  });
  if (!message) {
    throw BadRequestException({ message: "Message not found or you are not authorized to view it" });
  }
  return message;
};

export const deleteMessage = async (userId, messageId) => {

  const deletedMessage = await deleteOne({
    model: MessageModel,
    filter: { _id: messageId, receverId: userId }, 
  });

  if (!deletedMessage) {
    throw BadRequestException({ 
      message: "Message not found or you are not authorized to delete it" 
    });
  }

  return deletedMessage;
};
