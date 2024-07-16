//뷰포트 변경사항 감지해서 높이 알려주는 훅
import { useState, useEffect, useRef } from 'react'

const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowHeight = window.innerHeight
        const containerTop = containerRef.current.getBoundingClientRect().top
        const newHeight = windowHeight - containerTop
        setViewportHeight(newHeight)
      }
    }

    handleResize() // 초기 높이 설정

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { viewportHeight, containerRef }
}

export default useViewportHeight
