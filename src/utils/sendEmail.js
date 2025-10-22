import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  if (!to) {
    console.error("❌ Missing `to` address in sendEmail");
    return;
  }
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,    // optional
      html     // optional – at least one should exist
    });
    if (error) {
      console.error("❌ Resend send error:", error);
      return;
    }
    console.log("✅ Email sent, id:", data.id);
    return data;
  } catch (err) {
    console.error("❌ sendEmail exception:", err);
    throw err;
  }
}
