import React from 'react';

import {
  productItems,
  ProductItemsType,
  ItemType,
} from 'assets/data/productItems';
import Pagination from 'components/Pagenation';
import ImageSlider from 'components/ImageSlider';

// Pagination
// Image Slider

function Products() {
  const sortDescendingByScore = (arr: ProductItemsType): ProductItemsType => {
    return arr.sort((a: ItemType, b: ItemType) => b.score - a.score);
  };

  const sortedProductItems = sortDescendingByScore(productItems);

  return (
    <div>
      {/* <Pagination productItems={sortedProductItems} /> */}
      <ImageSlider productItems={sortedProductItems} />
    </div>
  );
}

export default Products;
