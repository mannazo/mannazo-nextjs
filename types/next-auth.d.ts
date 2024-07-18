import 'next-auth'

declare module 'next-auth' {
  interface User {
    additionalInfo: {
      firstTimeUser: boolean
      serverUserId: string
      serverToken: string
      provider: string
      socialId: string
      secret: string
    }
  }

  interface Session {
    user: User
  }
}
