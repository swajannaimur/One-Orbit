import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export async function sendResetEmail(to, token){
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const mailOptions = {
        from: `"OneOrbit Support" <${process.env.SMTP_USER}>`,
        to, 
        subject: "Reset your OneOrbit password",
        html: `
        <h2>Password Reset Request</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below to set a new password (valid for 1 hour):</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <br><br>
      <p>If you didn’t request this, ignore this email.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}
