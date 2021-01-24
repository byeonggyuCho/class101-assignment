import { useContext, useState } from 'react';
import styled from 'styled-components';

import { ProductItemType, CouponType } from 'types/types';
import { CartContext } from 'reducer/context';
import Coupon from 'components/Cart/Coupon';

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

interface PurchasingItemProps {
  coupons: CouponType[];
}

// Number Format
// Show -discounted price
function PurchasingItem({ coupons }: PurchasingItemProps) {
  const { state } = useContext(CartContext);
  const { purchasingCart } = state;
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  let discounted = 0;

  const handleChange = coupon => {
    selectedCoupon ? setSelectedCoupon(null) : setSelectedCoupon(coupon);
  };

  const handleClick = e => {
    const { nodeName } = e.target;
    if (nodeName !== 'INPUT') {
      setIsClicked(prev => !prev);
    }
  };

  const filterDiscountables = arr => {
    return arr.filter(item => !item.hasOwnProperty('availableCoupon'));
  };

  const filterNonDiscountables = arr => {
    return arr.filter(item => item.hasOwnProperty('availableCoupon'));
  };

  const getSum = (arr: ProductItemType[]): number => {
    return arr.reduce((acc, cur) => (acc += cur.price * cur.amount), 0);
  };

  const getTotalPrice = (arr: ProductItemType[]): number => {
    if (selectedCoupon && purchasingCart.length > 0) {
      const isDiscountables = filterDiscountables(arr);
      const sumOfDiscountables = getSum(isDiscountables);
      const isNonDiscountables = filterNonDiscountables(arr);
      const sumOfNonDiscountables = getSum(isNonDiscountables);

      return (
        sumOfNonDiscountables +
        getDiscountedPrice(selectedCoupon, sumOfDiscountables)
      );
    } else {
      return getSum(arr);
    }
  };

  const getDiscountedPrice = (coupon: CouponType, sum: number): number => {
    if (sum <= 0) return 0; // Show flash Message

    const { type, discountRate, discountAmount } = coupon;
    if (type === 'rate') {
      const discounted = sum / discountRate;
      return sum - discounted;
    } else if (type === 'amount') {
      return sum - discountAmount;
    }
  };

  return (
    <Wrapper>
      <TotalSum>결제금액</TotalSum>
      <Coupon
        title="사용가능한 쿠폰 보기"
        coupons={coupons}
        isClicked={isClicked}
        onClick={handleClick}
        onChange={handleChange}
      />
      <SubTitle>
        총 상품 금액<span>{getSum(purchasingCart)}원</span>
      </SubTitle>
      <SubTitle>
        쿠폰할인 금액<span>{discounted}원</span>
      </SubTitle>
      <SubTitle>
        최종 가격<span>{getTotalPrice(purchasingCart)}원</span>
      </SubTitle>
    </Wrapper>
  );
}

export default PurchasingItem;
