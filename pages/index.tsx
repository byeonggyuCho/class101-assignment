import styled from 'styled-components';
import Navigation from 'components/Layout/Navigation';
import { RoutesType } from 'types/types';

const Wrapper = styled.div`
  text-align: center;
`;

function Home() {
  const routes: RoutesType = ['products', 'cart'];

  return (
    <Wrapper>
      <h1>Class101 Assignment</h1>
      <Navigation routes={routes} />
    </Wrapper>
  );
}

export default Home;
