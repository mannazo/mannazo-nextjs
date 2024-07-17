// app/api/images/[...key]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string[] } }
) {
  const key = params.key.join('/')
  console.log(`Requested key: ${key}`)

  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  })

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    console.log(`Generated signed URL: ${signedUrl}`)
    return NextResponse.redirect(signedUrl)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }
}
