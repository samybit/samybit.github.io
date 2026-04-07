"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  try {
    await resend.emails.send({
      // "onboarding@resend.dev" allows to send testing emails without verifying a domain
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "samyb.samir@gmail.com",
      subject: `New Freelance Lead from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to send email. Please try again later." };
  }
}