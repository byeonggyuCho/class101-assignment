import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ItemType } from 'assets/data/productItems';
import { formatPrice } from 'utility/utility';

const Wrapper = styled.div`
  position: relative;
  width: calc(1280px / 5 + 3px);
  height: 20rem;
  flex-shrink: 0;
  padding-right: 15px;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 10rem;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 1rem 0.5rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  text-align: center;
  line-height: 1.3;
`;

const Price = styled.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 700;
  margin-top: 2.5rem;
`;

const Icon = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 1.4rem;
  z-index: 10;
  cursor: pointer;
`;

interface CardProps {
  produnctItem: ItemType;
  setWidth: (width: number) => void;
}

function Card({ produnctItem, setWidth }: CardProps) {
  const { title, coverImage, price } = produnctItem;
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      const width: number = cardRef.current.clientWidth;
      setWidth(width);
    }
  }, []);

  return (
    <Wrapper ref={cardRef}>
      <Icon src="/assets/icons/cart.svg" alt="Shopping Cart" />
      <ImageWrapper>
        <Img src={coverImage} alt={title} />
      </ImageWrapper>
      <Content>
        <Title>{title}</Title>
        <Price>{formatPrice(price)}원</Price>
      </Content>
    </Wrapper>
  );
}

export default Card;
