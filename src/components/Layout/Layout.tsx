import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { routes } from 'utility/utility';
import Navbar from 'components/Layout/Navbar/Navbar';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
      margin: 0;
      padding: 0;
      box-sizing:border-box;
  }

  html {
    font-size: 62.5%;

    @media (max-width: 768px) {
      ${'' /* 8px = 1rem */}
      font-size: 50%; 
    }
    @media (max-width: 576px) {
      ${'' /* 7px = 1rem */}
      font-size: 43.75%; 
    }
    @media (max-width: 320px) {
      ${'' /* 5.5px = 1rem */}
      font-size: 37%;
    }
  }

  body {
    font-family: 'Lato';

  li,
  a {
    color: currentColor;
  }

  a {
    text-decoration: none;
  }

  p,li {
    font-size: 1.6rem;
  }
`;

interface LayoutProp {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  padding-top: 7rem;
  height: 100%;
`;

function Layout({ children }: LayoutProp) {
  return (
    <div>
      <GlobalStyle />
      <Navbar logo="Class101" routes={routes} />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}

export default Layout;
