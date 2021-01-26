import { useState, useMemo, useRef, useEffect } from 'react';
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
  width: 85%;
`;

const ItemsWrapper = styled.div<{ xPosition: number }>`
  height: 400px;
  display: flex;
  align-items: center;
  transition: transform 0.6s ease-in-out;
  transform: ${({ xPosition }) => xPosition && `translateX(${xPosition}px)`};
`;

const Button = styled.img<{ direction: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

const LeftButton = styled(Button)<{ isCountFirst: boolean }>`
  display: ${({ isCountFirst }) => (isCountFirst ? `none` : `block`)};
  left: ${({ direction }) => direction === 'prev' && 4}%;
`;

const RightButton = styled(Button)<{ isCountLast: boolean }>`
  display: ${({ isCountLast }) => (isCountLast ? `none` : `block`)};
  right: ${({ direction }) => direction === 'next' && 4}%;
`;

interface CarouselProps {
  products: ProductType[];
}

function Carousel({ products }: CarouselProps) {
  const [count, setCount] = useState(1);
  const [xPosition, setXPosition] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  const handleGetWidth = () => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      setWidth(width);
    }
  };

  useEffect(() => {
    handleGetWidth();

    window.addEventListener('resize', handleGetWidth);
    return () => window.removeEventListener('resize', handleGetWidth);
  }, []);

  const maxPageNumber: number = useMemo(() => Math.ceil(products.length / 5), [
    products,
  ]);

  const handleClickPrev = (): void => {
    if (count === 1) return;
    setCount(prev => prev - 1);
    setXPosition(prev => prev + width);
  };

  const handleClickNext = (): void => {
    if (count >= maxPageNumber) {
      setCount(1);
      setXPosition(0);
    } else {
      setCount(prev => prev + 1);
      setXPosition(prev => prev - width);
    }
  };

  return (
    <Wrapper>
      <InnerWrapper ref={ref}>
        <ItemsWrapper xPosition={xPosition}>
          {products.map((product: ProductType) => (
            <CarouselItem key={product.id} product={product} width={width} />
          ))}
        </ItemsWrapper>
      </InnerWrapper>
      <LeftButton
        src="/assets/icons/prev.svg"
        direction="prev"
        alt="Previous Button"
        onClick={handleClickPrev}
        isCountFirst={count === 1}
      />
      <RightButton
        src="/assets/icons/next.svg"
        direction="next"
        alt="Next Button"
        onClick={handleClickNext}
        isCountLast={count >= maxPageNumber}
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
