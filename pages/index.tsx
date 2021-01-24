import styled from 'styled-components';

import Layout from 'components/Layout/Layout';
import { Title } from 'styles/styles';

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
`;

function Home() {
  return (
    <Layout>
      <Wrapper>
        <Title>Class101 Assignment</Title>
        <SubTitle>By Suyeon Kang</SubTitle>
      </Wrapper>
    </Layout>
  );
}

export default Home;
