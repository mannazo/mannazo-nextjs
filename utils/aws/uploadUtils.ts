// 이 파일이 만들어진 이유: 매번 req body를 명시하기보다, 타입이 명시된 파라미터로 함수 호출해서 업로드하는 것이 효율적이므로.
// utils/uploadUtils.ts
export const getUploadUrl = async (
  fileName: string,
  fileType: string,
  category: 'post' | 'community' | 'profile'
) => {
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName, fileType, category }),
  })

  if (!response.ok) {
    throw new Error('Failed to get upload URL')
  }

  return response.json()
}

export const uploadToS3 = async (file: File, uploadUrl: string) => {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to upload file to S3')
  }
}
