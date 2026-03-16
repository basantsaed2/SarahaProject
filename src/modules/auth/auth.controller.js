import { Router } from "express";
import { signup, login, getUserById, generateRefreshToken, signupGoogle } from "./auth.service.js";
import { BadRequestException, SuccessResponse, auth } from "../../common/index.js";
import { signupSchema, loginSchema } from "./auth.validation.js";
import { validate } from "../../common/index.js";
import { multer_local } from "../../common/middleware/multer.js";
import { extensionMap } from "../../common/extension/extensions.js";

const router = Router();

router.post('/signup', multer_local({ customPath: "users/profileImages" , allowedExtensions: extensionMap.image }).single("image"), validate(signupSchema), async (req, res) => {
    const userAdedd = await signup(req.body , req.file );
    return SuccessResponse({ res, message: "user add sucessfully", data: userAdedd })
});

router.post('/login', validate(loginSchema), async (req, res) => {
    const userAdedd = await login(req.body, `${req.protocol}://${req.host}`);
    return SuccessResponse({ res, message: "user login sucessfully", data: userAdedd })
});

router.get('/get-user', auth, async (req, res) => {
    const user = await getUserById(req.user);
    return SuccessResponse({ res, message: "user fetched sucessfully", data: user })
});

router.post('/generate-refresh-token', async (req, res) => {
    const token = await generateRefreshToken(req.headers?.authorization);
    return SuccessResponse({ res, message: "token generated sucessfully", data: token })
});

router.post('/signup/email', async (req, res) => {
    const data = await signupGoogle(req.body);
    return SuccessResponse({ res, message: "user add sucessfully", data })
});

export default router;