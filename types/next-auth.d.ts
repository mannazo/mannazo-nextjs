// types/next-auth.d.ts

import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      userId?: string
      name?: string | null
      email?: string | null
      image?: string | null
      additionalInfo?: any
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    additionalInfo?: any
  }
}
