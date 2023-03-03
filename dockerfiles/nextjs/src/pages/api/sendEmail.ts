import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Send an inquiry email for users to contact
const SendEmail = (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailData = {
    from: req.body.email,
    to: "tsubasa.bneaus@gmail.com",
    subject: `[Exchange Rate Reminder] Inquiry from ${req.body.name}`,
    text: `${req.body.message} Sent from ${req.body.email}`,
    html: `
      <p>[NAME]</p>
      <p>${req.body.name}</p>
      <p>[EMAIL]</p>
      <p>${req.body.email}</p>
      <p>[MESSAGE]</p>
      <p>${req.body.message}</p>

    `,
  };

  transporter.sendMail(mailData);
};

export default SendEmail;
