import { useRef, useEffect, useState } from 'react';

export function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const newWidth = ref.current ? ref.current.getBoundingClientRect().width : 0;
    setWidth(newWidth);
  }, [width]);

  return { ref, width };
}
