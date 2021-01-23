import styled from 'styled-components';

import Layout from 'components/Layout/Layout';

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 2rem;
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
