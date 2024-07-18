// url 받으려면 /api/images/[...key] 로 보내줘야 함. filename과 category 받아서 해당 url 만들어 반환해주는 함수임.
// utils/imageUtils.ts
export const getImageUrl = (
  fileName: string,
  category: 'post' | 'community' | 'profile'
) => {
  // 파일 이름에 이미 category가 포함되어 있는지 확인
  if (fileName.startsWith(`${category}/`)) {
    return `/api/images/${fileName}`
  }
  // category가 포함되어 있지 않다면 추가
  return `/api/images/${category}/${fileName}`
}
