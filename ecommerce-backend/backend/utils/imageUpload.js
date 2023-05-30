import { s3 } from "../config/s3.config.js"

export const s3Upload = async ({ body, key, contentType, bucket }) => {
  return await s3
    .upload({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
    .promise()
}

export const s3Delete = async ({ key, bucket }) => {
  return await s3
    .deleteObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
}
