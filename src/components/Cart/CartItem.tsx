import styled from 'styled-components';

import { ProductItemType } from 'types/types';
import { Image } from 'styles/styles';
import { formatPrice } from 'utility/utility';

const Item = styled.div`
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

const InputWrapper = styled.div`
  margin-left: auto;
`;

interface CartItemProp {
  item: ProductItemType;
  onChange: (item: ProductItemType) => void;
}

function CartItem({ item, onChange }: CartItemProp) {
  const { coverImage, title, price, availableCoupon } = item;

  return (
    <Item>
      <Checkbox type="checkbox" onChange={() => onChange(item)} />
      <ImageWrapper>
        <Image src={coverImage} alt={title} />
      </ImageWrapper>
      <TextWrapper>
        <Description>{title}</Description>
        <h3>{formatPrice(price)}원</h3>
        {availableCoupon && <h4>쿠폰 사용가능</h4>}
      </TextWrapper>
      <InputWrapper>
        <input
          type="number"
          id="count"
          name="count"
          min="1"
          max="100"
          defaultValue="1"
        />
      </InputWrapper>
    </Item>
  );
}

export default CartItem;
