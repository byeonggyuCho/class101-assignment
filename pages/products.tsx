import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ProductType } from 'types/types';
import { Title } from 'styles/styles';
import { productItems } from 'assets/data/productItems';
import Layout from 'components/Layout/Layout';
import Carousel from 'components/Products/Carousel';

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Products() {
  const sortDescendingByScore = (arr: ProductType[]): ProductType[] => {
    return arr.sort((a: ProductType, b: ProductType) => b.score - a.score);
  };

  const sortedProducts: ProductType[] = useMemo(
    () => sortDescendingByScore(productItems),
    [productItems]
  );

  return (
    <Layout>
      <Wrapper>
        <Title>Products</Title>
        <Carousel products={sortedProducts} />
      </Wrapper>
    </Layout>
  );
}

export default Products;
