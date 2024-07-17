import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// 요청 본문에 대한 인터페이스 정의
interface RequestBody {
  fileName: string
  fileType: string
  category: 'post' | 'community' | 'profile' //기능별 데이터를 구조화
}

// 환경 변수 타입 정의
interface EnvVariables {
  AWS_REGION: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_BUCKET_NAME: string
}

// 환경 변수 검증 함수
export function validateEnv(): EnvVariables {
  const requiredEnvVars = [
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_BUCKET_NAME',
  ]
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }

  return {
    AWS_REGION: process.env.AWS_REGION!,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
  }
}

const categoryPrefixes = {
  post: 'post/',
  community: 'community/',
  profile: 'profile/',
}

export async function POST(request: Request) {
  console.log('POST request received')

  try {
    const env = validateEnv()
    console.log('Environment variables validated')

    console.log('Initializing S3 client')
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })

    console.log('Parsing request body')
    const body: RequestBody = await request.json()
    console.log('Request body:', body)

    //요구되는 모든 필드가 왔는지 확인한다.
    if (!body.fileName || !body.fileType || !body.category) {
      throw new Error('Missing required fields in request body')
    }

    const originalFileName = body.fileName
    const fileExtension = originalFileName.split('.').pop()
    if (!fileExtension) {
      throw new Error('Invalid file name (no extension)')
    }

    // 카테고리에 따른 접두어 선택 (S3에서 접두어에 따라 바로 구분 가능함)
    const prefix = categoryPrefixes[body.category] || ''
    const newFileName = `${prefix}${uuidv4()}.${fileExtension}`
    console.log('New file name:', newFileName)

    console.log('Creating PutObjectCommand')
    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: newFileName,
      ContentType: body.fileType,
    })

    console.log('Getting signed URL')
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    })
    console.log('Signed URL generated (1hr)')

    return NextResponse.json({ url: signedUrl, fileName: newFileName })
  } catch (error) {
    console.error('Detailed error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      {
        error: 'Error generating signed URL',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
