import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(request: Request) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const body = await request.json()
  const originalFileName = body.fileName
  const fileExtension = originalFileName.split('.').pop()
  const newFileName = `${uuidv4()}.${fileExtension}`

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${newFileName}`,
    ContentType: body.fileType,
  })

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    })
    return NextResponse.json({ url: signedUrl, fileName: newFileName })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error generating signed URL' },
      { status: 500 }
    )
  }
}
