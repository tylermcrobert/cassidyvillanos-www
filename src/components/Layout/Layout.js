import React from 'react';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';

function Layout({ children }) {
  return (
    <div>
      <GlobalStyle />
      <Styled.Wrapper>
        {children}
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


export default Layout;
