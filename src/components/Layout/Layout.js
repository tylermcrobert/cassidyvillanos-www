import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import GlobalStyle from './GlobalStyle';

function Layout({ children, title }) {
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{`${title ? `${title} - ` : ''}Marc-Cassidy Villanos`}</title>
        <meta name="Description" content="The Portfolio of Marc-Cassidy Villanos" />
        <link rel="canonical" href="https://this-design-microsite-playground.netlify.com/" />
      </Helmet>
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
