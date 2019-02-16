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
  transition 200ms ease-out;
  width: 100vw;
  height: 100vh;
  left: -50%;
  top: -50%;
  padding: 5vw;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
    display: ${props => (props.visible ? 'block' : 'none')}
  }

  ${props => props.page && css`
    transform: translate3d(50%, 50%, 0)
  `}
`;

Styled.Link = styled(Link)`
  position: relative;
  transition: color 300ms ease
  color: white;
  z-index: ${zIndex.textBg};
  font-size: calc(4vw + 4vh);
  line-height: 1.2;

  &:not(:last-child)::after {
    content:' / ';
  }

  &:hover {
    color: white;
    z-index: ${zIndex.textFg};

    &::after {
      opacity: 0;
    }
  }
`;

const { Overlay } = Styled;
export { Overlay };
export default Styled;
