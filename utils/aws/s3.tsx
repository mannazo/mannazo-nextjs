// utils/s3.ts
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

interface S3UploadResult {
  fileName: string
  fileUrl: string
}

const awsConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
}

const s3Client = new S3Client({
  region: awsConfig.region,
  credentials: {
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  },
})

export const uploadImageToS3 = async (
  file: File
): Promise<S3UploadResult | null> => {
  if (!file) return null

  const fileExtension = file.name.split('.').pop()
  const s3FileName = `${uuidv4()}.${fileExtension}`

  try {
    const uploadParams = {
      Bucket: awsConfig.bucketName,
      Key: s3FileName,
      Body: file,
      ContentType: file.type,
    }

    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    return {
      fileName: s3FileName,
      fileUrl: getS3Url(s3FileName),
    }
  } catch (error) {
    console.error(`An error occurred: `, error)
    return null
  }
}

export const getS3Url = (fileName: string): string => {
  return `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${fileName}`
}
