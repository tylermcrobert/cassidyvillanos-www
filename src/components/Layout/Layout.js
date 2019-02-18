import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import useMousePos from '../../hooks/useMousePos';

const zIndex = {
  textBg: 10,
  textFg: 30,
  overlayImg: 20,
};


function Layout({ children }) {
  const slowMove = useRef();
  const overlayRef = useRef();

  useMousePos(({ x, y }) => {
    const transformVal = `translate3d(${x}px ,${y}px, 0) scale(.8)`;
    overlayRef.current.style.transform = transformVal;
  });


  const enableParallaxMouse = useMousePos(({ x, y }) => {
    const offsetX = (x / (window.innerWidth / 2)) * 0.6;
    const offsetY = (y / (window.innerHeight / 2)) * 0.6;
    const transformVal = `translate3d(${offsetX}% ,${offsetY}%, 0)`;
    slowMove.current.style.transform = transformVal;
  });

  return (
    <div>
      <GlobalStyle />
      <Styled.Wrapper>
        <div ref={slowMove}>
          <Styled.Overlay ref={overlayRef}>
          </Styled.Overlay>
          <Styled.Container>
            {children({ enableParallaxMouse })}
          </Styled.Container>
        </div>
      </Styled.Wrapper>
    </div>
  );
}

const Styled = {};

Styled.Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 2rem;
`;


Styled.Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 10vh;
`;

Styled.Overlay = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: ${zIndex.overlayImg};
  transition 200ms cubic-bezier(.39,.575,.565,1);
  width: 100vw;
  height: 100vh;
  left: -50%;
  top: -50%;
  padding: 5vw;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`;


export default Layout;
