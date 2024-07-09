'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/') // 로그인 후 리다이렉트할 페이지
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }


  try {
    if (session.user !== null && session.user !== undefined) {
      console.log(session.user)
    }
  } catch (e) {
    console.error(e)
  }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Login</h1>

      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 mb-2 w-64"
      >
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
        </div>
        <span className="font-semibold">Login with Google</span>
      </button>

      <button
        onClick={() => signIn('naver')}
        className="px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 rounded-lg text-white bg-[#03C75A] hover:bg-[#02a94b] hover:shadow transition duration-150 mb-2 w-64"
      >
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" preserveAspectRatio="xMidYMid meet">
            <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"></path>
          </svg>
        </div>
        <span className="font-semibold">Login with Naver</span>
      </button>

      <button
        onClick={() => signIn('kakao')}
        className="px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 rounded-lg text-[#3A1D1D] bg-[#FEE500] hover:bg-[#FDD000] hover:shadow transition duration-150 w-64"
      >
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" preserveAspectRatio="xMidYMid meet">
            <path d="M12 3C5.9 3 1 6.9 1 11.7c0 3.3 2.1 6.1 5.3 7.7.3.1.6.4.5.7l-.7 2.6c-.1.4.4.7.7.5l3-2c.3-.2.6-.2.9-.2.7.1 1.5.1 2.3.1 6.1 0 11-3.9 11-8.7S18.1 3 12 3z" />
          </svg>
        </div>
        <span className="font-semibold">Login with Kakao</span>
      </button>
    </div>
  )
}