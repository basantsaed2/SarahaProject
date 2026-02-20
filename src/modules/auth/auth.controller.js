import { Router } from "express";
import { signup , login } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";

const router = Router();

router.post('/signup', async (req, res) => {
    const userAdedd = await signup(req.body);
    return SuccessResponse({res , message : "user add sucessfully" , data : userAdedd})
});

router.post('/login', async (req, res) => {
    const userAdedd = await login(req.body);
    return SuccessResponse({res , message : "user login sucessfully" , data : userAdedd})
});

export default router;