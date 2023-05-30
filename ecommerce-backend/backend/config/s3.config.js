import aws from "aws-sdk"
import { config } from "./config.js"

export const s3 = new aws.S3({
  region: config.S3_REGION,
  accessKeyId: config.S3_ACCESS_KEY,
  secretAccessKey: config.S3_SECRET_KEY,
})
