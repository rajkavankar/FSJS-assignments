import { config } from "../config/config.js"
import { transporter } from "../config/mailtransporter.config.js"

export const mailHelper = async (option) => {
  const message = {
    from: config.SMTP_MAIL_USER,
    to: option.email,
    subject: option.subject,
    text: option.message,
  }

  await transporter.sendMail(message)
}
