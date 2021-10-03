import { useEffect, useMemo, useState } from 'react';

type UseWindowSizeReturnType = {
  width: number;
  height: number;
  isLargeScreen: boolean;
};

export function useWindowSize(): UseWindowSizeReturnType {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isLargeScreen = useMemo(
    () => windowSize.width > 800,
    [windowSize.width]
  );

  return { ...windowSize, isLargeScreen };
}
