import { useRef } from 'react';

export default function useThrottledTimeout() {
  const timer = useRef(null);

  function run(cb, delay) {
    if (timer.current) return;
    timer.current = setTimeout(() => {
      cb();
      clear();
    }, delay);
  }

  function clear() {
    clearTimeout(timer.current);
    timer.current = null;
  }

  return { run, clear };
}
