'use client'

import { signIn } from 'next-auth/react'
import SocialLoginButton from '@/components/users/sign-up/SocialLoginButton'

export default function LoginForm() {
  return (
    <>
      <SocialLoginButton
        provider="google"
        color="text-slate-700"
        hoverColor="hover:text-slate-900"
        bgColor="bg-white"
        hoverBgColor="hover:bg-gray-100"
      >
        Login with Google
      </SocialLoginButton>

      <SocialLoginButton
        provider="naver"
        color="text-white"
        bgColor="bg-[#03C75A]"
        hoverBgColor="hover:bg-[#02a94b]"
      >
        Login with Naver
      </SocialLoginButton>

      <SocialLoginButton
        provider="kakao"
        color="text-[#3A1D1D]"
        bgColor="bg-[#FEE500]"
        hoverBgColor="hover:bg-[#FDD000]"
      >
        Login with Kakao
      </SocialLoginButton>
    </>
  )
}
