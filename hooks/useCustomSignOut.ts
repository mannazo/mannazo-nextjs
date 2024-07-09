// hooks/useCustomSignOut.ts
import { signOut as nextAuthSignOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const useCustomSignOut = () => {
  const router = useRouter()

  const signOut = async () => {
    // 로컬 스토리지 클리어
    localStorage.clear()

    // 세션 스토리지 클리어
    sessionStorage.clear()

    // 모든 쿠키 삭제
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // NextAuth signOut 호출
    await nextAuthSignOut({ redirect: false })

    // 로그인 페이지로 리다이렉트
    router.push('/login')
  }

  return signOut
}
