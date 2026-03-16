import { Router } from "express";
import {
  sendMessage,
  getAllMessages,
  getMessagesById,
  deleteMessage,
} from "./messages.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
import { auth, validate } from "../../common/index.js";
import { multer_local } from "../../common/middleware/multer.js";
import { extensionMap } from "../../common/extension/extensions.js";
import { sendMessageSchema } from "./messages.validation.js";

const router = Router();

router.post("/send-message/:receverId",validate(sendMessageSchema), async (req, res) => {
  let data = await sendMessage(req.body, req.params.receverId);
  SuccessResponse({ res, message: "Message sent successfully", data });
});

router.get("/get-messages", auth, async (req, res) => {
  let data = await getAllMessages(req.user?.id);
  SuccessResponse({ res, message: "Messages retrieved successfully", data });
});

router.get("/get-message-by-id/:messageId", auth, async (req, res) => {
  let data = await getMessagesById(req.user?.id, req.params.messageId);
  SuccessResponse({ res, message: "Messages retrieved successfully", data });
});

router.delete("/delete-message/:messageId", auth, async (req, res) => {
  let data = await deleteMessage(req.user?.id, req.params.messageId);
  SuccessResponse({ res, message: "Message deleted successfully", data });
});

router.post(
  "/message_image",
  multer_local({ customPath: "messages/singleImages" , allowedExtensions: extensionMap.image }).single("image"),
  (req, res) => {
    req.file.finalPath = `${req.file.destination}/${req.file.filename}`;
    res.status(200).json({
      message: "done",
      file: req.file,
      body: req.body,
    });
  },
);

router.post(
  "/message_images",
  multer_local({ customPath: "messages/multipleImages" }).array("images", 2),
  (req, res) => {
    req.files.forEach((file) => {
      file.finalPath = `${file.destination}/${file.filename}`;
    });
    res.status(200).json({
      message: "done",
      files: req.files,
      body: req.body,
    });
  },
);

router.post(
  "/message_fields",
  multer_local({ customPath: "messages/fields" }).fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    // Object.keys(req.files).forEach(key => {
    //         req.files[key].forEach(file => {
    //                 file.finalPath = `${file.destination}/${file.filename}`
    //         })
    // })

    // Object.values(req.file).forEach(files =>{
    //         files.forEach(file =>{
    //                 file.finalPath = `${file.destination}/${file.filename}`
    //         })
    // })

    console.log(req.files);

    Object.values(req.files)
      .flat()
      .forEach((file) => {
        file.finalPath = `${file?.destination}/${file.filename}`;
      });

    res.status(200).json({
      message: "done",
      files: req.files,
      body: req.body,
    });
  },
);

export default router;
