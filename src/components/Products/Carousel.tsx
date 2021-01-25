import { useState, useMemo } from 'react';
import styled from 'styled-components';

import { ProductType } from 'types/types';
import Pagination from 'components/Products/Pagination';
import CarouselItem from 'components/Products/CarouselItem';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 1280px;
`;

const ItemsWrapper = styled.div<{ xPosition: number }>`
  height: 400px;
  display: flex;
  align-items: center;
  transition: transform 0.6s ease-in-out;
  transform: ${({ xPosition }) =>
    xPosition ? `translateX(${xPosition + 8}px)` : `translateX(8px)`};
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

interface CarouselProps {
  products: ProductType[];
}

function Carousel({ products }: CarouselProps) {
  const [count, setCount] = useState(1);
  const [xPosition, setXPosition] = useState(0);

  const maxPageNumber: number = useMemo(() => Math.ceil(products.length / 5), [
    products,
  ]);

  const handleClickPrev = (): void => {
    if (count === 1) return;
    setCount(prev => prev - 1);
    setXPosition(prev => prev + 1280);
  };

  const handleClickNext = (): void => {
    if (count >= maxPageNumber) {
      setCount(1);
      setXPosition(0);
    } else {
      setCount(prev => prev + 1);
      setXPosition(prev => prev - 1280);
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <ItemsWrapper xPosition={xPosition}>
          {products.map((product: ProductType) => (
            <CarouselItem key={product.id} product={product} />
          ))}
        </ItemsWrapper>
      </InnerWrapper>
      <Button
        src="/assets/icons/prev.svg"
        direction="prev"
        alt="Previous Button"
        onClick={handleClickPrev}
      />
      <Button
        src="/assets/icons/next.svg"
        direction="next"
        alt="Next Button"
        onClick={handleClickNext}
      />
      <Pagination
        count={count}
        setCount={setCount}
        maxPageNumber={maxPageNumber}
        setXPosition={setXPosition}
      />
    </Wrapper>
  );
}

export default Carousel;
