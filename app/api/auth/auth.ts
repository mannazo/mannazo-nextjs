import type { NextAuthOptions } from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

interface Session {
  user: {
    userId: string
    name?: string | null
    email?: string | null
    image?: string | null
    additionalInfo?: any
  }
}

export const authOptions: NextAuthOptions = {
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
          let secret = '';
          switch (account.provider) {
            case 'kakao':
              secret = process.env.KAKAO_CLIENT_SECRET!;
              break;
            case 'naver':
              secret = process.env.NAVER_CLIENT_SECRET!;
              break;
            case 'google':
              secret = process.env.GOOGLE_CLIENT_SECRET!;
              break;
            default:
              console.error('Unknown provider');
              return false;
          }

          const response = await axios.post(`${process.env.SERVER_URL}/auth/login`, {
            socialId: user.id,
            secret: secret,
            provider: account.provider
          }, {
            timeout: 5000
          });
          console.log('success: ', response.data);
        } catch (error) {
          console.error('Error sending login data to server:', error);
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.userId = user.id
        token.additionalInfo = profile
      }
      return token
    },
    async session({ session, token }) {
      (session as Session).user.userId = token.userId as string
      ;(session as Session).user.additionalInfo = token.additionalInfo
      return session
    },
  },
}