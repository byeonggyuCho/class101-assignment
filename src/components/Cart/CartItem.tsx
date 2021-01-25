import { ChangeEvent, useContext } from 'react';
import styled from 'styled-components';

import { CartContext } from 'reducer/context';
import { ProductType } from 'types/types';
import { Image, Icon } from 'styles/styles';
import { formatPrice } from 'utility/utility';
import { removeItemFromCart } from 'reducer/actions';

const Wrapper = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  padding: 1rem 0;
`;

const ImageWrapper = styled.div`
  width: 15rem;
  height: 10rem;
  margin-left: 2rem;
`;

const TextWrapper = styled.div`
  margin: 0 2rem;

  h3 {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CouponTitle = styled.h4`
  font-size: 0.8rem;
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
`;

interface CartItemProp {
  item: ProductType;
  onChange: (e: ChangeEvent<HTMLInputElement>, item: ProductType) => void;
  onChangeAmount: (e: ChangeEvent<HTMLSelectElement>, id: string) => void;
}

function CartItem({ item, onChange, onChangeAmount }: CartItemProp) {
  const { dispatch } = useContext(CartContext);
  const { coverImage, title, price, availableCoupon, id, isChecked } = item;
  const amountOptions: number[] = [1, 2, 3, 4, 5];

  const handleClick = (id: string): void => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Wrapper>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={e => onChange(e, item)}
      />
      <ImageWrapper>
        <Image src={coverImage} alt={title} />
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

export default CartItem;
