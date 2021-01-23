import React from 'react';

import { routes } from 'utility/utility';
import Navbar from 'components/Layout/Navbar/Navbar';

interface LayoutProp {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProp) {
  return (
    <div>
      <Navbar logo="Class101" routes={routes} />
      {children}
    </div>
  );
}

export default Layout;
