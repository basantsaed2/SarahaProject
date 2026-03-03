import { Router } from "express";
import { sendMessage , getAllMessages , getMessagesById, deleteMessage } from "./messages.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
import { auth } from "../../common/index.js";

const router = Router();

router.post("/send-message/:receverId", async (req, res) => {
        let data = await sendMessage(req.body, req.params.receverId);
        SuccessResponse({ res, message: "Message sent successfully", data })
})

router.get("/get-messages", auth ,  async (req, res) => {
        let data = await getAllMessages(req.user?.id);
        SuccessResponse({ res, message: "Messages retrieved successfully", data })
})

router.get("/get-message-by-id/:messageId", auth ,  async (req, res) => {
        let data = await getMessagesById(req.user?.id, req.params.messageId);
        SuccessResponse({ res, message: "Messages retrieved successfully", data })
})

router.delete("/delete-message/:messageId", auth, async (req, res) => {
  let data = await deleteMessage(req.user?.id, req.params.messageId);
  SuccessResponse({ res, message: "Message deleted successfully", data });
});

export default router;