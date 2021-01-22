import styled from 'styled-components';
import Link from 'next/link';
import { RoutesType } from 'types/types';

type NavigationType = {
  routes: RoutesType;
};

const Item = styled.li`
  font-size: 1.5rem;

  a {
    text-decoration: none;
  }
`;

function Navigation({ routes }: NavigationType) {
  return (
    <div>
      {routes.map((route: string, i: number) => (
        <Item key={i}>
          <Link href={`/${route}`}>
            <a>{route}</a>
          </Link>
        </Item>
      ))}
    </div>
  );
}

export default Navigation;
