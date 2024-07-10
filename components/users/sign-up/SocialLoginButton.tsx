'use client'

import { signIn } from 'next-auth/react'

type SocialLoginButtonProps = {
  provider: string
  color: string
  bgColor: string
  hoverColor?: string
  hoverBgColor: string
  children: React.ReactNode
}

export default function SocialLoginButton({
  provider,
  color,
  bgColor,
  hoverColor,
  hoverBgColor,
  children,
}: SocialLoginButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return (
          <img
            className="w-full h-full"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
        )
      case 'naver':
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"></path>
          </svg>
        )
      case 'kakao':
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M12 3C5.9 3 1 6.9 1 11.7c0 3.3 2.1 6.1 5.3 7.7.3.1.6.4.5.7l-.7 2.6c-.1.4.4.7.7.5l3-2c.3-.2.6-.2.9-.2.7.1 1.5.1 2.3.1 6.1 0 11-3.9 11-8.7S18.1 3 12 3z" />
          </svg>
        )
    }
  }

  return (
    <button
      onClick={() => signIn(provider)}
      className={`px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 rounded-lg ${color} ${bgColor} ${hoverColor} ${hoverBgColor} hover:shadow transition duration-150 mb-2 w-64`}
    >
      <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
        {getIcon()}
      </div>
      <span className="font-semibold">{children}</span>
    </button>
  )
}
