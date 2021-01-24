import React, { useContext } from 'react';
import styled from 'styled-components';

import { CartContext } from 'reducer/context';
import { CartActionType } from 'reducer/actions';
import { ProductItemType } from 'types/types';
import { formatPrice } from 'utility/utility';
import { Image } from 'styles/styles';

const Wrapper = styled.div`
  position: relative;
  width: calc(1280px / 5);
  flex-shrink: 0;
  padding-right: 1rem;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 10rem;
  overflow: hidden;
`;

const Img = styled(Image)`
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 2rem 0.5rem 1rem 0.5rem;
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
  margin-top: 3rem;
`;

const Icon = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 1.4rem;
  z-index: 10;
  cursor: pointer;
`;

interface CardProps {
  productItem: ProductItemType;
}

function Card({ productItem }: CardProps) {
  const { title, coverImage, price } = productItem;
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const handleAddItemToCart = (item: ProductItemType): void => {
    dispatch({ type: CartActionType.ADD_ITEM_TO_CART, payload: item });
  };

  const handleClick = (item: ProductItemType): void => {
    if (cart.length >= 3) return;
    handleAddItemToCart(item);
  };

  return (
    <Wrapper>
      <Icon
        src="/assets/icons/cart.svg"
        alt="Shopping Cart"
        onClick={() => handleClick(productItem)}
      />
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
