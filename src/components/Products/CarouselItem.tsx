import React, { useContext } from 'react';
import styled from 'styled-components';

import { CartContext } from 'reducer/context';
import { ProductType } from 'types/types';
import { formatPrice } from 'utility/utility';
import { Image } from 'styles/styles';
import { addItemToCart, removeItemFromCart } from 'reducer/actions';

const Wrapper = styled.div`
  position: relative;
  width: calc(1280px / 5);
  flex-shrink: 0;
  padding-right: 1rem;
  box-sizing: border-box;
  height: 20rem;
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

interface CarouselItemProps {
  product: ProductType;
}

function CarouselItem({ product }: CarouselItemProps) {
  const { title, coverImage, price, id } = product;
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const isAleadyExisting: boolean = cart.filter(el => el.id === id).length > 0;

  const handleClick = (item: ProductType): void => {
    const { id } = item;
    if (cart.length >= 3 && isAleadyExisting) {
      // 장바구니의 아이템이 3개 존재하고, 선택한 아이템이 장바구니에 이미 존재할 경우
      dispatch(removeItemFromCart(id));
    } else if (cart.length >= 3 && !isAleadyExisting) {
      // 장바구니의 아이템이 3개 존재하고, 장바구니에 담기지 않은 아이템을 추가할 경우
      alert('장바구니에 담을 수 있는 아이템의 최대 개수는 3개 입니다.');
    } else {
      handleToggle(item);
    }
  };

  const handleToggle = (item: ProductType): void => {
    const { id } = item;
    isAleadyExisting
      ? dispatch(removeItemFromCart(id))
      : dispatch(addItemToCart(item));
  };

  return (
    <Wrapper>
      <Icon
        src={
          isAleadyExisting
            ? '/assets/icons/cart-fill.svg'
            : '/assets/icons/cart.svg'
        }
        alt="Shopping Cart"
        onClick={() => handleClick(product)}
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

export default React.memo(CarouselItem);
