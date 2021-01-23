import React from 'react';
import styled from 'styled-components';

import { ProductItemType, ProductItemsType } from 'types/types';
import { productItems } from 'assets/data/productItems';
import Layout from 'components/Layout/Layout';
import ImageSlider from 'components/ImageSlider/ImageSlider';

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
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
        <ImageSlider productItems={sortedProductItems} />
      </Wrapper>
    </Layout>
  );
}

export default Products;
