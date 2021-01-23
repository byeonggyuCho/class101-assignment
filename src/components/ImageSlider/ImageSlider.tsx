import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProductItemsType, ItemType } from 'assets/data/productItems';
import Pagination from 'components/ImageSlider/Pagination';
import Card from 'components/ImageSlider/Card';

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

const CardsWrapper = styled.div<{ xPosition: number }>`
  height: 450px;
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
  width: 1.2rem;
  height: 1.2rem;
  left: ${({ direction }) => direction === 'prev' && 2}%;
  right: ${({ direction }) => direction === 'next' && 2}%;
`;

interface ImageSliderProp {
  productItems: ProductItemsType;
}

function ImageSlider({ productItems }: ImageSliderProp) {
  const [count, setCount] = useState(4);
  const [xPosition, setXPosition] = useState(0);
  const [width, setWidth] = useState(0);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<ItemType[]>([]);

  useEffect(() => {
    handleCurrentItems();
  }, [currentPage]);

  const handleClickPrev = (): void => {
    if (count === 4) return;
    setCount(prev => prev - 1);
    setXPosition(prev => prev + width);
  };

  const handleClickNext = (): void => {
    if (count >= productItems.length - 1) {
      setCount(4);
      setXPosition(0);
    } else {
      setCount(prev => prev + 1);
      setXPosition(prev => prev - width);
    }
  };

  const handleCurrentItems = () => {
    const itemsPerPage: number = 5;
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentProductsItems: ItemType[] = productItems.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentItems(currentProductsItems);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <CardsWrapper xPosition={xPosition}>
          {currentItems.map((produnctItem: ItemType) => (
            <Card
              key={produnctItem.id}
              produnctItem={produnctItem}
              setWidth={setWidth}
            />
          ))}
        </CardsWrapper>
      </InnerWrapper>
      <div>
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
      </div>
      <Pagination
        currentPage={currentPage}
        onClick={setCurrentPage}
        productItems={productItems}
      />
    </Wrapper>
  );
}

export default ImageSlider;
