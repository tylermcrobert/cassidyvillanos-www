import { useEffect } from 'react';

export default function useMouseMover(callback, { enabled }) {
  let x = 0;
  let y = 0;


  function handleMouseMove(e) {
    x = e.clientX;
    y = e.clientY;
    if (enabled) {
      callback({ x, y });
    }
  }

  function removeEvent() {
    window.removeEventListener('mousemove', handleMouseMove);
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return (() => {
      removeEvent();
    });
  });

  return removeEvent;
}
