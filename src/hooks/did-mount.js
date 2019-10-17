import { useRef, useEffect } from 'react';

export const useDidMount = () => {
  const didMountRef = useRef(true);
  useEffect(() => {
    didMountRef.current = false;
  }, []);
  return didMountRef.current;
};