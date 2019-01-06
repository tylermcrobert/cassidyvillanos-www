import styled from 'styled-components';
import CursorTrigger from 'containers/Cursor/CursorTrigger';

export const Heading = styled(CursorTrigger)`
  cursor: pointer;
  display: inline;
  position: relative;

  a {
    position: relative;
    transition: color 300ms $ease;

    &::after {
      content: ' / ';
    }

    &:hover {
      color: white;
      z-index: 400;

      &::after {
        opacity: 0;
      }
    }
  }
`;

export const Thumbnail = styled.img`
  width: 80vw;
  height: 80vh;
  object-fit: contain;
`;
export default null;
