import styled from 'styled-components';

import { ProductItemsType, ItemType } from 'assets/data/productItems';
import Card from 'components/ImageSlider/Card';

// Remove repeating type
interface ImageSliderProp {
  productItems: ProductItemsType;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CardsWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  width: 1280px;
  height: 450px;
  margin: 0 auto;
  transition: transform 0.6s ease-in-out;
`;

const Button = styled.img<{ direction: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
  left: ${({ direction }) => direction === 'prev' && 2}%;
  right: ${({ direction }) => direction === 'next' && 2}%;
`;

function ImageSlider({ productItems }: ImageSliderProp) {
  return (
    <Wrapper>
      <CardsWrapper>
        {productItems.map((produnctItem: ItemType) => (
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
