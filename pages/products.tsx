import React from 'react';
import styled from 'styled-components';

import {
  productItems,
  ProductItemsType,
  ItemType,
} from 'assets/data/productItems';
import Layout from 'components/Layout/Layout';
// import Pagination from 'components/Pagenation';
import ImageSlider from 'components/ImageSlider/ImageSlider';

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Pagination
// Image Slider
function Products() {
  const sortDescendingByScore = (arr: ProductItemsType): ProductItemsType => {
    return arr.sort((a: ItemType, b: ItemType) => b.score - a.score);
  };

  const sortedProductItems = sortDescendingByScore(productItems);

  return (
    <Layout>
      {/* <Pagination productItems={sortedProductItems} /> */}
      <Wrapper>
        <ImageSlider productItems={sortedProductItems} />
      </Wrapper>
    </Layout>
  );
}

export default Products;
