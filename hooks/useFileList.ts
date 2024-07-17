// 이 훅을 만든 이유: 파일 업로드 상태를 관리 (업로드 된 파일 리스트)
// 이 훅은 파일 업로드 로직에 있어서 필수적인 요소는 아님
// hooks/useFileList.ts
import { useState } from 'react'

interface UploadedFile {
  fileName: string
  category: 'post' | 'community' | 'profile'
}

export const useFileList = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const addFile = (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => {
    setFiles((prevFiles) => [...prevFiles, { fileName, category }])
  }

  return { files, addFile }
}
