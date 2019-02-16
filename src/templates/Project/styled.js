import styled from 'styled-components';

const Styled = {};

Styled.Image = styled.img`
  display: ${props => (props.current ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

Styled.ImageWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  margin: 5vw;
`;

Styled.Bar = styled.div`

`;

Styled.ProjectWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Styled;
