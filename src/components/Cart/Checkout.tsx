import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components';

import { ProductType, CouponType } from 'types/types';
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

interface CheckoutProps {
  coupons: CouponType[];
}

interface FilteredProducts {
  discountables: ProductType[];
  nonDiscountables: ProductType[];
}

interface TotalPrice {
  totalSum: number;
  discount: number;
}

interface DiscountPrice {
  discount: number;
  discountedPrice: number;
}

// Number Format
// 체크 헤제시 price를 0으로 설정
// 쿠폰을 먼저 설정후, 상품 체크시, 쿠폰 적용
// 체크아웃 리스트에 담긴 아이템을 차트에서 삭제하면, 체크아웃 리스트에서도 삭제
// 쿠폰은 한가지만 사용가능 합니다
function Checkout({ coupons }: CheckoutProps) {
  const { state } = useContext(CartContext);
  const { checkout } = state;
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleChange = useCallback(
    (coupon: CouponType): void => {
      selectedCoupon ? setSelectedCoupon(null) : setSelectedCoupon(coupon);
    },
    [selectedCoupon]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      const { nodeName } = e.target as HTMLInputElement;
      if (nodeName !== 'INPUT') {
        setIsClicked(prev => !prev);
      }
    },
    []
  );

  const filterProductsByDiscountability = (
    arr: ProductType[]
  ): FilteredProducts => {
    const discountables: ProductType[] = arr.filter(
      item => !item.hasOwnProperty('availableCoupon')
    );
    const nonDiscountables: ProductType[] = arr.filter(item =>
      item.hasOwnProperty('availableCoupon')
    );
    return { discountables, nonDiscountables };
  };

  const getOriginalPrice = (arr: ProductType[]): number => {
    return arr.reduce((acc, cur) => (acc += cur.price * cur.amount), 0);
  };

  const getDiscounts = (
    coupon: CouponType,
    sum: number
  ): number | DiscountPrice => {
    const { type, discountRate, discountAmount } = coupon;
    let discount: number;
    let discountedPrice: number;

    if (sum <= 0) {
      alert('쿠폰 적용이 불가한 상품입니다.');
      return 0;
    }
    if (type === 'rate') {
      discount = sum / discountRate;
      discountedPrice = sum - discount;
      return { discount, discountedPrice };
    } else if (type === 'amount') {
      discountedPrice = sum - discountAmount;
      return { discount: discountAmount, discountedPrice };
    }
  };

  const getTotalPrice = useCallback(
    (arr: ProductType[]): number | TotalPrice => {
      const isCheckoutExisting: boolean = checkout.length > 0;

      if (selectedCoupon && isCheckoutExisting) {
        const {
          discountables,
          nonDiscountables,
        } = filterProductsByDiscountability(arr);
        const sumOfDiscountables: number = getOriginalPrice(discountables);
        const sumOfNonDiscountables: number = getOriginalPrice(
          nonDiscountables
        );
        const { discount, discountedPrice }: any = getDiscounts(
          selectedCoupon,
          sumOfDiscountables
        );
        const totalSum: number = sumOfNonDiscountables + discountedPrice;
        return { totalSum, discount };
      }

      return getOriginalPrice(arr);
    },
    [selectedCoupon]
  );

  const { totalSum, discount }: any = getTotalPrice(checkout);
  enum Price {
    originalPrice = getOriginalPrice(checkout),
    dicountPrice = discount ? -discount : 0,
    totalPrice = discount ? totalSum : Price.originalPrice,
  }

  return (
    <Wrapper>
      <TotalSum>결제 금액</TotalSum>
      <Coupon
        title="사용가능한 쿠폰 보기"
        coupons={coupons}
        isClicked={isClicked}
        onClick={handleClick}
        onChange={handleChange}
      />
      <SubTitle>
        총 상품 금액<span>{Price.originalPrice}원</span>
      </SubTitle>
      <SubTitle>
        쿠폰할인 금액<span>{Price.dicountPrice}원</span>
      </SubTitle>
      <SubTitle>
        최종 결제 금액<span>{Price.totalPrice}원</span>
      </SubTitle>
    </Wrapper>
  );
}

export default React.memo(Checkout);
