import styled from 'styled-components';

import { ProductItemsType } from 'assets/data/productItems';
import Card from 'components/Card';

// Remove repeating type
interface ImageSliderProp {
  productItems: ProductItemsType;
}

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  overflow-x: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
`;

const CardsWrapper = styled.div`
  display: flex;
  align-items: center;
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
      <CardsWrapper>
        {productItems.map(produnctItem => (
          <Card key={produnctItem.id} produnctItem={produnctItem} />
        ))}
      </CardsWrapper>

      <Button
        src="/assets/icons/prev.svg"
        direction="prev"
        alt="Previous Button"
      />
      <Button src="/assets/icons/next.svg" direction="next" alt="Next Button" />
    </Wrapper>
  );
}

export default ImageSlider;
