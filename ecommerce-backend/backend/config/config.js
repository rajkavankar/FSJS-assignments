import dotenv from "dotenv"

dotenv.config()

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
  SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
  SMTP_MAIL_USER: process.env.SMTP_MAIL_USER,
  SMPT_MAIL_PASSWORD: process.env.SMPT_MAIL_PASSWORD,
}
