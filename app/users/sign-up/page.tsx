import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/auth'
import SignUpForm from '@/components/users/sign-up/SignUpForm'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:px-6 lg:px-8">
      <SignUpForm initialEmail={session.user.email} initialName={session.user.name} />
    </div>
  )
}