//Serverside 에서

//uuid import 방식이 변경됨 https://github.com/uuidjs/uuid#deep-requires-now-deprecated
import { v4 as uuidv4 } from 'uuid'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })

    const originalFileName = req.body.fileName
    const fileExtension = originalFileName.split('.').pop()
    const newFileName = `${uuidv4()}.${fileExtension}`

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${newFileName}`,
      ContentType: req.body.fileType,
    })

    try {
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      })
      res.status(200).json({ url: signedUrl, fileName: newFileName })
    } catch (error) {
      res.status(500).json({ error: 'Error generating signed URL' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
