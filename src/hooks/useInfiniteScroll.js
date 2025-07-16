import { useEffect } from 'react';

export default function useInfiniteScroll(ref, onTop) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      if (el.scrollTop === 0) onTop();
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [ref, onTop]);
}
