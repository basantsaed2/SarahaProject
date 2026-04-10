import { EventEmitter } from "events";
import { set } from "../../../database/redis.service.js";
import { sendEmail } from "./sendemail.js";
import { hashPassword } from "../../index.js";

export const event = new EventEmitter();

event.on("verfiyEmail", async (user) => {

    let { userId, email } = user;

    let code = Math.floor(Math.random() * 10000);
    code = code.toString().padEnd(4, 0);

    await set({
        key: `otp::${userId}`,
        value: await hashPassword(code),
        ex: 5 * 60
    });

    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `
      <h1>Welcome to Saraha</h1>
      <p>Click the link below to verify your email:</p>
      <p>${code}</p>
    `
    });
})

