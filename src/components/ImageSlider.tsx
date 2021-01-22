import styled from 'styled-components';

import { ProductItemsType } from 'assets/data/productItems';
import ProductItem from 'components/ProductItem';

// Remove repeating type
interface ImageSliderProp {
  productItems: ProductItemsType;
}

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
`;

const Slider = styled.div`
  display: flex;
  width: 100%;
  height: 450px;
  transition: transform 0.6s ease-in-out;
`;

const Button = styled.img<{ direction: string }>`
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  font-size: 15px;
  transform: translateY(-50%);
  left: ${props => props.direction === 'prev' && 5}px;
  right: ${props => props.direction === 'next' && 5}px;
`;

function ImageSlider({ productItems }: ImageSliderProp) {
  return (
    <Wrapper>
      <Slider>
        {productItems.map(produnctItem => (
          <ProductItem key={produnctItem.id} />
        ))}
      </Slider>

      <Button
        src="/assets/icons/next.svg"
        direction="prev"
        alt="Previous Button"
      />
      <Button src="/assets/icons/prev.svg" direction="next" alt="Next Button" />
    </Wrapper>
  );
}

export default ImageSlider;
