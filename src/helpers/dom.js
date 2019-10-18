import { useRef, useEffect, useState, useCallback } from 'react';

export function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  const setWidthFromRef = useCallback(() => {
    const newWidth = ref.current ? ref.current.getBoundingClientRect().width : 0;
    setWidth(newWidth);
  }, [ref, setWidth]);

  useEffect(() => {
    setWidthFromRef();
    window.addEventListener('resize', setWidthFromRef);
    return () => window.removeEventListener('resize', setWidthFromRef);
  }, );



  return { ref, width };
}
