import styled, { css } from 'styled-components';
import { Link } from 'gatsby';


const Styled = {};

const zIndex = {
  textBg: 10,
  textFg: 30,
  overlayImg: 20,
};

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
  width: 100vw;
  height: 100vh;
  left: -50%;
  top: -50%;
  padding: 5vw;

  ${props => !props.page && `
    transition 200ms cubic-bezier(.39,.575,.565,1);
  `}

  ${props => props.transitioning && `
    transition 300ms cubic-bezier(.39,.575,.565,1);
  `}

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`;


Styled.Link = styled(Link)`
  position: relative;
  z-index: ${zIndex.textBg};
  font-size: calc(4vw + 4vh);
  line-height: 1.2;
  transition: 200ms opacity cubic-bezier(.39,.575,.565,1);

  ${props => props.transitioning && css`
    opacity: 0;
  `}

  &:not(:last-child)::after {
    content:' / ';
  }

  &:hover {
    color: white;
    transition-delay: ${props => props.transitioning && '800ms'};
    z-index: ${zIndex.textFg};

    &::after {
      opacity: 0;
    }
  }
`;

const { Overlay } = Styled;
export { Overlay };
export default Styled;
