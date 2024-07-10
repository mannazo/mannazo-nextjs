'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/components/(auth)/login/LoginForm'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      const isFirstUser = session.user.additionalInfo.isFirstUser

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
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-4 text-4xl font-bold">Login</h1>
      <LoginForm />
    </div>
  )
}
