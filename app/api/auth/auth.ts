import type { NextAuthOptions } from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user && account) {
        try {
          let secret = ''
          switch (account.provider) {
            case 'kakao':
              secret = process.env.KAKAO_CLIENT_SECRET!
              break
            case 'naver':
              secret = process.env.NAVER_CLIENT_SECRET!
              break
            case 'google':
              secret = process.env.GOOGLE_CLIENT_SECRET!
              break
            default:
              console.error('Unknown provider')
              return false
          }

          const response = await axios.post(
            `${process.env.SERVER_URL}/auth/login`,
            {
              socialId: user.id,
              secret: secret,
              provider: account.provider,
            },
            {
              timeout: 5000,
            }
          )

          console.log(response)

          user.additionalInfo = {
            firstTimeUser: response.data.firstTimeUser,
            serverUserId: response.data.userId,
            serverToken: response.data.token,
            provider: account.provider,
            socialId: user.id,
            secret: secret,
          }

          console.log('success: ', response.data)
        } catch (error) {
          console.error('Error sending login data to server:', error)
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      return process.env.NEXTAUTH_URL || baseUrl
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.userId = user.id
        token.additionalInfo = profile
      }
      if (user?.additionalInfo) {
        token.additionalInfo = user.additionalInfo
      }
      return token
    },
    async session({ session, token }) {
      if (token.additionalInfo) {
        // @ts-ignore
        session.user.additionalInfo = token.additionalInfo
      }
      return session
    },
  },
}
