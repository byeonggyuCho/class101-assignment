import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { ProductItemType } from 'types/types';
import { Image } from 'styles/styles';
import { formatPrice } from 'utility/utility';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const ImageWrapper = styled.div`
  width: 15rem;
  height: 10rem;
`;

const TextWrapper = styled.div`
  margin: 0 2rem;

  h3 {
    margin-bottom: 1rem;
  }
`;

const Checkbox = styled.input`
  margin-right: 2rem;
`;

const Description = styled.h2`
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CouponTitle = styled.h4`
  font-size: 0.8rem;
  color: #ff912a;
`;

const InputWrapper = styled.div`
  margin-left: auto;
`;

interface CartItemProp {
  item: ProductItemType;
  amount: number;
  onChange: (item: ProductItemType) => void;
  onChangeAmount: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

function CartItem({ item, amount, onChange, onChangeAmount }: CartItemProp) {
  const { coverImage, title, price, availableCoupon, id } = item;

  return (
    <Wrapper>
      <Checkbox type="checkbox" onChange={() => onChange(item)} />
      <ImageWrapper>
        <Image src={coverImage} alt={title} />
      </ImageWrapper>
      <TextWrapper>
        <Description>{title}</Description>
        <h3>{formatPrice(price)}원</h3>
        {!availableCoupon && <CouponTitle>* 쿠폰 사용 불가능</CouponTitle>}
      </TextWrapper>
      <InputWrapper>
        <input
          type="number"
          min="1"
          max="100"
          value={amount}
          onChange={e => onChangeAmount(e, id)}
        />
      </InputWrapper>
    </Wrapper>
  );
}

export default CartItem;
