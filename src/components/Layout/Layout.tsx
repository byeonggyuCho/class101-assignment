import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { routes } from 'utility/utility';
import Navbar from 'components/Layout/Navbar/Navbar';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato';
  }

  li,
  a {
    color: currentColor;
  }

  a {
    text-decoration: none;
  }
`;

interface LayoutProp {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProp) {
  return (
    <div>
      <GlobalStyle />
      <Navbar logo="Class101" routes={routes} />
      {children}
    </div>
  );
}

export default Layout;
