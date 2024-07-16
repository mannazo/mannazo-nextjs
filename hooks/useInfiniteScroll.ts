import { useState, useEffect, useRef, useCallback } from 'react'

export const useInfiniteScroll = (fetchMore: () => void) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
          fetchMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetching, fetchMore]
  );

  useEffect(() => {
    if (!isFetching) return;
    setIsFetching(false);
  }, [isFetching]);
  return { lastElementRef, isFetching};
};
