import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: env.GOOGLE_USER,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log('📧 Email transporter is ready to send emails');
  })
  .catch((error) => {
    console.error('❌ Email transporter verification failed:', error);
  });

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  try {
    const mailOptions = {
      from: env.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    };

    const details = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', details.messageId);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw new Error('Email sending failed');
  }
}
