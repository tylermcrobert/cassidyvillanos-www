import { useEffect } from 'react';

export default function useMouseMover(node) {
  let x = 0;
  let y = 0;

  function moveObject() {
    const overlay = node.current;
    overlay.style.transform = `translate3d(${x}px ,${y}px, 0)`;
  }

  function handleMouseMove(e) {
    x = e.clientX;
    y = e.clientY;
    moveObject();
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return (() => {
      window.removeEventListener('mousemove', handleMouseMove);
    });
  });
}
