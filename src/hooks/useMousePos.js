import { useEffect } from 'react';

export default function useMouseMover(callback) {
  function handleMouseMove(e) {
    callback({ x: e.clientX, y: e.clientY });
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
