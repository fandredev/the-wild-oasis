import { useEffect, useRef } from 'react';

export function useClickOutsideModal(
  close: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [close, listenCapturing]);

  return ref;
}
