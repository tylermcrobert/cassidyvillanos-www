import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const Styled = {};

Styled.Link = styled(Link)`
  position: relative;
  z-index: 10;
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
    z-index: 30;

    &::after {
      opacity: 0;
    }
  }
`;

const { Overlay } = Styled;
export { Overlay };
export default Styled;
