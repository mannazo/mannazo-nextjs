import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
// 다른 provider들도 필요에 따라 import

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // 다른 provider 설정
  ],
  // 필요한 다른 NextAuth 옵션들
  // 예: callbacks, pages, session 등
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
