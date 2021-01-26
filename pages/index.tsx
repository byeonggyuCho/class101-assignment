import styled from 'styled-components';

import Layout from 'components/Layout/Layout';
import { Title } from 'styles/styles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SubTitle = styled.h2`
  font-size: 2.5rem;
  margin-top: 3rem;
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
