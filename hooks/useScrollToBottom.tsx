import { useRef, useCallback, useLayoutEffect, useState } from 'react'

const useScrollToBottom = (
  dependencies = [],
  options = { behavior: 'smooth', duration: 1000, threshold: 100 }
) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [isInitialRender, setIsInitialRender] = useState(true)

  const scrollToBottom = useCallback(
    (force = false) => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.clientHeight
        const contentHeight = contentRef.current.clientHeight
        const scrollTop = containerRef.current.scrollTop
        const maxScrollTop = contentHeight - containerHeight

        // 강제 스크롤이거나 사용자가 스크롤 영역의 하단에서 threshold 이내에 있는지 확인
        const isNearBottom =
          force || maxScrollTop - scrollTop <= options.threshold

        if (isNearBottom) {
          const startTime = performance.now()
          const startTop = containerRef.current.scrollTop

          const step = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / options.duration, 1)

            const easeProgress =
              progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2

            containerRef.current.scrollTop =
              startTop + (maxScrollTop - startTop) * easeProgress

            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }

          requestAnimationFrame(step)
        }
      }
    },
    [options.duration, options.threshold]
  )

  useLayoutEffect(() => {
    if (isInitialRender) {
      scrollToBottom(true) // 초기 렌더링 시 강제 스크롤
      setIsInitialRender(false)
    } else {
      scrollToBottom() // 이후 업데이트 시 조건부 스크롤
    }
  }, dependencies)

  return [containerRef, contentRef, scrollToBottom]
}

export default useScrollToBottom
