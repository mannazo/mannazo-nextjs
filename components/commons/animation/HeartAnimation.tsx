import React, { useState, useEffect, useMemo } from 'react'
import './HeartAnimation.css'

const HeartAnimation = ({ x, y }) => {
  const [visible, setVisible] = useState(true)

  const style = useMemo(() => {
    const duration = 1 + Math.random() * 2 // 1-3초 사이의 랜덤 지속 시간
    const maxWiggle = 30 + Math.random() * 30 // 30-60px 사이의 최대 좌우 이동
    const maxScale = 1 + Math.random() // 1-2 사이의 최대 크기

    return {
      left: `${x}px`,
      top: `${y}px`,
      animation: `float ${duration}s ease-in-out`,
      '--max-wiggle': `${maxWiggle}px`,
      '--max-scale': maxScale,
    }
  }, [x, y])

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setVisible(false)
      },
      style.animation.split(' ')[1].replace('s', '') * 1000
    )

    return () => clearTimeout(timer)
  }, [style.animation])

  if (!visible) return null

  return (
    <div className="heart" style={style}>
      ❤️
    </div>
  )
}

export default HeartAnimation
