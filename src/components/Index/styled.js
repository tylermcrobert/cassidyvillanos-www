import styled from 'styled-components';

const Styled = {};

const zIndex = {
  textBg: 10,
  textFg: 30,
  overlayImg: 20,
};

Styled.Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

Styled.Overlay = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: ${zIndex.overlayImg};
  transform 200ms ease-out;
  width: 80vw;
  height: 80vh;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
    transform: translate3d(-50%, -50%, 0);
  }
`;

Styled.Link = styled.a`
  position: relative;
  display: inline-block;
  transition: color 300ms ease
  color: white;
  z-index: ${zIndex.textBg};
  font-size: calc(4vw + 4vh);

  &::after {
    content: ' / ';
  }

  &:hover {
    color: white;
    z-index: ${zIndex.textFg};

    &::after {
      opacity: 0;
    }
  }
`;

export default Styled;
