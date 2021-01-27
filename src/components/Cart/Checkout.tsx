import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ProductType, CouponType } from 'types/types';
import { CartContext } from 'reducer/context';
import { formatPrice } from 'utility/utility';
import Coupon from 'components/Cart/Coupon';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 3rem;
  box-sizing: border-box;
  background-color: #f2f2f2;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TotalSum = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const SubTitle = styled.p`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

interface CheckoutProps {
  coupons: CouponType[];
}

interface FilteredProducts {
  discountables: ProductType[];
  nonDiscountables: ProductType[];
}

interface SelectedCoupon {
  rate: boolean;
  amount: boolean;
}

interface DiscountPrice {
  discount: number;
  discountedPrice: number;
}

interface TotalPrice {
  discount: number;
  totalPrice: number;
}

function Checkout({ coupons }: CheckoutProps) {
  const { state } = useContext(CartContext);
  const { checkout } = state;
  const [selectedCoupon, setSelectedCoupon] = useState<SelectedCoupon>({
    rate: false,
    amount: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // 쿠폰의 종류 확인
    const { id, checked } = e.target;
    setSelectedCoupon({ ...selectedCoupon, [id]: checked });
  };

  const getOriginalPrice = (arr: ProductType[]): number => {
    return arr.reduce((acc, cur) => (acc += cur.price * cur.amount), 0);
  };

  const filterProductsByDiscountability = (
    arr: ProductType[]
  ): FilteredProducts => {
    // 쿠폰 사용 가능 여부에 따라서 배열 분리 (할인가능, 불가능)
    const discountables: ProductType[] = arr.filter(
      item => !item.hasOwnProperty('availableCoupon')
    );
    const nonDiscountables: ProductType[] = arr.filter(item =>
      item.hasOwnProperty('availableCoupon')
    );
    return { discountables, nonDiscountables };
  };

  const handleDiscount = (
    coupon: SelectedCoupon,
    sum: number
  ): DiscountPrice => {
    const isDiscountable: boolean = sum > 0;
    let discountedPrice: number;
    let discount: number;

    if (coupon.rate && coupon.amount && isDiscountable) {
      discount = sum / 10 + 10000;
      discountedPrice = sum - discount;
    } else if (coupon.rate && isDiscountable) {
      discount = sum / 10;
      discountedPrice = sum - discount;
    } else if (coupon.amount && isDiscountable) {
      discount = 10000;
      discountedPrice = sum - discount;
    }
    return { discountedPrice, discount };
  };

  const calcPrice = (): TotalPrice => {
    // 할인가능 상품 합계, 할인 불가능상품 합계
    const { discountables, nonDiscountables } = filterProductsByDiscountability(
      checkout
    );
    const sumOfDiscountable: number = getOriginalPrice(discountables);
    const sumOfNonDiscountables: number = getOriginalPrice(nonDiscountables);

    // 할인된 금액 =  (할인가능 상품 - 할인)
    const { discount, discountedPrice } = handleDiscount(
      selectedCoupon,
      sumOfDiscountable
    );

    //  할인된 함계 금액 = 총금액 - (할인된 금액) + 할인 불가능 상품
    const totalPrice: number = discountedPrice + sumOfNonDiscountables;
    return { discount, totalPrice };
  };

  const originalPrice: number = getOriginalPrice(checkout); // 총금액 = 할인가능 상품 + 할인불가능 상품
  const { discount, totalPrice }: TotalPrice = calcPrice(); // 할인 금액, 할인된 합계 금액

  return (
    <Wrapper>
      <TotalSum>결제 금액</TotalSum>
      <Coupon
        title="사용가능한 쿠폰"
        coupons={coupons}
        onChange={handleChange}
      />
      <SubTitle>
        총 상품 금액<span>{formatPrice(originalPrice)}원</span>
      </SubTitle>
      <SubTitle>
        쿠폰할인 금액
        <span>{discount ? `-${formatPrice(discount)}` : 0}원</span>
      </SubTitle>
      <SubTitle>
        최종 결제 금액
        <span>{totalPrice ? formatPrice(totalPrice) : 0}원</span>
      </SubTitle>
    </Wrapper>
  );
}

export default React.memo(Checkout);
