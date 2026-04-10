import nodemailer from "nodemailer";
import { env } from "../../../../config/env.service.js";
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: env.APP_EMAIL,
        pass: env.APP_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"${env.APP_NAME}" <${env.APP_EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
