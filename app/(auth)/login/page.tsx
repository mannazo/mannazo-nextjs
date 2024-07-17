'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/components/(auth)/login/LoginForm'
import LoadingSpinner from '@/components/commons/LoadingSpinner'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      console.log(session)
      const isFirstUser = session.user.additionalInfo.firstTimeUser

      if (isFirstUser) {
        router.push('/users/sign-up')
      } else {
        router.push('/')
      }
    }
  }, [status, router])

  if (status === 'loading' || status === 'authenticated') {
    return <LoadingSpinner />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-4 text-4xl font-bold">Login</h1>
      <LoginForm />
    </div>
  )
}
