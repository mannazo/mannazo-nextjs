'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import * as PATHS from '@/constants/paths'

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(66, 153, 225, 0.6), 0 0 10px rgba(234, 118, 255, 0.6);
  }
  50% {
    box-shadow: 0 0 20px rgba(127, 182, 227, 0.8), 0 0 30px rgba(181, 158, 225, 0.8);
  }
`

const AnimatedButton = styled.button`
  background: linear-gradient(270deg, #4299e1, #9f7aea, #4299e1);
  background-size: 200% 200%;
  animation:
    ${gradientAnimation} 3s ease infinite,
    ${glowAnimation} 2s ease-in-out infinite;
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

export default function TripButton({ buttonText }) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        )
      )
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = () => {
    const path = isMobile ? PATHS.MOBILE_TRIP : PATHS.DESKTOP_TRIP
    router.push(path)
  }

  return <AnimatedButton onClick={handleClick}>{buttonText}</AnimatedButton>
}
