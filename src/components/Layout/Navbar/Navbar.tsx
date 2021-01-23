import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { RouteType, RoutesType } from 'types/types';

type NavbarType = {
  logo: string;
  routes: RoutesType;
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  height: 4rem;
  padding: 0 3rem;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
`;

const Item = styled.li<{ isActive: boolean }>`
  text-decoration: ${({ isActive }) => isActive && 'underline'};

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

function Navbar({ logo, routes }: NavbarType) {
  const { asPath } = useRouter();

  return (
    <Wrapper>
      <Logo>
        <Link href="/">
          <a>{logo}</a>
        </Link>
      </Logo>
      <List>
        {routes.map((route: RouteType, i: number) => (
          <Item key={i} isActive={asPath === `/${route.route}`}>
            <Link href={`/${route.route}`}>
              <a>{route.text}</a>
            </Link>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}

export default Navbar;
