// export default function Page({ params }: { params: { slug: string } }) {
//   return <div>slug: {params.slug}</div>
// }
'use client'

import React, { useState } from 'react'
import HeartAnimation from '@/components/commons/animation/HeartAnimation'

const ParentComponent = () => {
  const [hearts, setHearts] = useState([])

  const handleClick = (event) => {
    const newHeart = {
      id: Date.now(),
      x: event.clientX,
      y: event.clientY,
    }

    setHearts((prevHearts) => [...prevHearts, newHeart])

    // 1초 후 하트 제거
    setTimeout(() => {
      setHearts((prevHearts) =>
        prevHearts.filter((heart) => heart.id !== newHeart.id)
      )
    }, 1000)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      클릭하면 하트가 올라갑니다!
      {hearts.map((heart) => (
        <HeartAnimation key={heart.id} x={heart.x} y={heart.y} />
      ))}
    </div>
  )
}

export default ParentComponent
