import { useContext } from 'react';
import styled from 'styled-components';

import { ProductItemType } from 'types/types';
import { CartContext } from 'contexts/cartContext';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #f2f2f2;
`;

const TotalSum = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 0.7rem;
  }
`;

function PurchasingItem() {
  const { state } = useContext(CartContext);
  const { purchasingCart } = state;

  const handleGetSum = (arr: ProductItemType[]): number => {
    return arr.reduce(
      (acc: number, cur: ProductItemType) =>
        (acc = acc + cur.price * cur.amount),
      0
    );
  };

  return (
    <Wrapper>
      <TotalSum>결제금액</TotalSum>
      <SubTitle>
        총 상품 금액<span>{handleGetSum(purchasingCart)}원</span>
      </SubTitle>
      <SubTitle>
        쿠폰 할인 금액<span>원</span>
      </SubTitle>
      <SubTitle>쿠폰 사용하기</SubTitle>
      <SubTitle>
        최종 가격<span>원</span>
      </SubTitle>
    </Wrapper>
  );
}

export default PurchasingItem;
