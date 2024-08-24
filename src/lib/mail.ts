
import nodemailer from 'nodemailer';
import { activationTemplate } from './emailTemplate/activation';
import Handlebars from "handlebars";
import { resetPasswordTemplate } from './forgotPassword/forgot';

export async function sendMail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const { SMTP_EMAIL, SMTP_GMAIL_PASS } = process.env; 

  if (!SMTP_EMAIL || !SMTP_GMAIL_PASS) {
    console.error("Missing SMTP credentials in environment variables");
    return;
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_GMAIL_PASS,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("Test Result of Transport:", testResult);

  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }

  try {
    const sendResult = await transport.sendMail({
        from: SMTP_EMAIL,
        to,
        subject,
        html: body,
    })
    console.log({sendResult})
  } catch (error) {
    console.log(error)
  }
}


export function compileActivationTemplate(name: string, url: string){
    const template = Handlebars.compile(activationTemplate)

    const htmlBody = template({
        name,
        url,
    });

    return htmlBody
}

export function compileResetPassTemplate(name: string, url: string){
  const template = Handlebars.compile(resetPasswordTemplate)

  const htmlBody = template({
      name,
      url,
  });

  return htmlBody
}




