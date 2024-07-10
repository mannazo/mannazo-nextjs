import NextAuth from 'next-auth'
import { authOptions } from './app/api/auth/auth'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authOptions)
