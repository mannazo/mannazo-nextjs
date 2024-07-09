'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/components/(auth)/login/LoginForm'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isFirstUser = true

  useEffect(() => {
    if (status === 'authenticated') {
      if (isFirstUser) {
        router.push('/users/sign-up')
      } else {
        router.push('/')
      }
    }
  }, [status, router])

  if (status === 'loading' || status === 'authenticated') {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <LoginForm />
    </div>
  )
}
