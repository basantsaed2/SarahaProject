import { Router } from "express";
import { signup, login, getUserById } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
import { auth } from "../../common/middleware/auth.js";

const router = Router();

router.post('/signup', async (req, res) => {
    const userAdedd = await signup(req.body);
    return SuccessResponse({ res, message: "user add sucessfully", data: userAdedd })
});

router.post('/login', async (req, res) => {
    const userAdedd = await login(req.body, `${req.protocol}://${req.host}`);
    return SuccessResponse({ res, message: "user login sucessfully", data: userAdedd })
});

router.get('/get-user', auth, async (req, res) => {
    const user = await getUserById(req.user);
    return SuccessResponse({ res, message: "user fetched sucessfully", data: user })
});

export default router;