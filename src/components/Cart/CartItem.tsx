import React, { ChangeEvent, useContext } from 'react';
import styled from 'styled-components';

import { CartContext } from 'reducer/context';
import { ProductType } from 'types/types';
import { Image, Icon } from 'styles/styles';
import { formatPrice } from 'utility/utility';
import { removeItemFromCart, removeItemFromCheckout } from 'reducer/actions';

const Wrapper = styled.div`
  display: flex;
  font-size: 1.6rem;
  align-items: center;
  padding: 2rem 0;

  @media (max-width: 576px) {
    flex-direction: column;
    padding: 2rem 5rem;
  }
`;

const ImageWrapper = styled.div`
  width: 25rem;
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Checkbox = styled.input`
  margin-right: 2rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.3;
  margin: 0 2rem;

  h3 {
    margin-bottom: 1rem;
  }

  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
    margin: 2rem 0 0;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CouponTitle = styled.h4`
  font-size: 1.4rem;
  color: #ff912a;
`;

const Select = styled.select`
  margin-left: auto;
  padding: 0.3rem;

  &:focus {
    outline: none;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media (max-width: 576px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;

interface CartItemProp {
  item: ProductType;
  cart: ProductType[];
  onChange: (e: ChangeEvent<HTMLInputElement>, item: ProductType) => void;
  onChangeAmount: (e: ChangeEvent<HTMLSelectElement>, id: string) => void;
}

function CartItem({ item, cart, onChange, onChangeAmount }: CartItemProp) {
  const { dispatch } = useContext(CartContext);
  const { coverImage, title, price, availableCoupon, id, isChecked } = item;
  const amountOptions: number[] = [1, 2, 3, 4, 5];

  const handleClick = (id: string): void => {
    const isExistingInCheckout = cart.filter(item => item.id === id).length > 0;
    dispatch(removeItemFromCart(id));

    if (isExistingInCheckout) {
      dispatch(removeItemFromCheckout(id));
    }
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <Checkbox
          type="checkbox"
          checked={isChecked}
          onChange={e => onChange(e, item)}
        />
        <div>
          <Image src={coverImage} alt={title} />
        </div>
      </ImageWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <h3>{formatPrice(price)}원</h3>
        {availableCoupon === false && (
          <CouponTitle>* 쿠폰 사용 불가능</CouponTitle>
        )}
      </TextWrapper>

      <OptionWrapper>
        <Select onChange={e => onChangeAmount(e, id)}>
          {amountOptions.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>
        <Icon
          src="/assets/icons/trash-can.svg"
          alt="상품 삭제하기"
          onClick={() => handleClick(id)}
        />
      </OptionWrapper>
    </Wrapper>
  );
}

export default React.memo(CartItem);
