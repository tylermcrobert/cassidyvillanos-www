import React from 'react';
import GlobalStyle from './GlobalStyle';

function Layout({ children }) {
  return (
    <div>
      <GlobalStyle />
      {children}
    </div>
  );
}

export default Layout;
