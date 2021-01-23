import React from 'react';
import styled from 'styled-components';

import { ProductItemType, ProductItemsType } from 'types/types';
import { Title } from 'styles/styles';
import { productItems } from 'assets/data/productItems';
import Layout from 'components/Layout/Layout';
import ImageSlider from 'components/Products/ImageSlider';

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Products() {
  const sortDescendingByScore = (arr: ProductItemsType): ProductItemsType => {
    return arr.sort(
      (a: ProductItemType, b: ProductItemType) => b.score - a.score
    );
  };

  const sortedProductItems = sortDescendingByScore(productItems);

  return (
    <Layout>
      <Wrapper>
        <Title>Products</Title>
        <ImageSlider productItems={sortedProductItems} />
      </Wrapper>
    </Layout>
  );
}

export default Products;
