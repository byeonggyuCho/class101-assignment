import React, { useContext, useState, useCallback, useEffect } from 'react';
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

interface TotalPrice {
  totalSum: number;
  discount: number;
}

interface DiscountPrice {
  discount: number;
  discountedPrice: number;
}

/* TODO
  쿠폰을 먼저 설정후, 상품 체크시, 쿠폰 적용
  쿠폰 중복 불가 메세지(쿠폰은 한가지만 사용가능 합니다)
*/

function Checkout({ coupons }: CheckoutProps) {
  const { state } = useContext(CartContext);
  const { checkout } = state;
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  // const [couponType, setCouponType] = useState({
  //   rate: false,
  //   amount: false,
  // });

  // useEffect(() => {
  //   showAlert();
  // }, [selectedCoupon]);

  // const showAlert = () => {
  //   if (couponType.rate === true && couponType.amount === true) {
  //     alert('쿠폰은 중복 사용이 불가능 합니다.');
  //     // set checkbox unchecked
  //     return;
  //   }
  // };

  const handleChange = useCallback(
    (e, coupon: CouponType): void => {
      const { id, checked } = e.target;
      if (selectedCoupon) {
        setSelectedCoupon(null);
      } else {
        setSelectedCoupon(coupon);
      }
      // setCouponType(prev => ({ ...prev, [id]: checked }));
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
    sumOfDiscountables: number
  ): number | DiscountPrice => {
    const { type, discountRate, discountAmount } = coupon;
    let discount: number;
    let discountedPrice: number;

    if (sumOfDiscountables <= 0) {
      return 0;
    }
    if (type === 'rate') {
      discount = sumOfDiscountables / discountRate;
      discountedPrice = sumOfDiscountables - discount;
      return { discount, discountedPrice };
    } else if (type === 'amount') {
      discountedPrice = sumOfDiscountables - discountAmount;
      return { discount: discountAmount, discountedPrice };
    }
  };

  const getTotalPrice = (arr: ProductType[]): number | TotalPrice => {
    const isCheckoutExisting: boolean = checkout.length > 0;

    if (selectedCoupon && isCheckoutExisting) {
      const {
        discountables,
        nonDiscountables,
      } = filterProductsByDiscountability(arr);
      const sumOfDiscountables: number = getOriginalPrice(discountables);
      const sumOfNonDiscountables: number = getOriginalPrice(nonDiscountables);
      const { discount, discountedPrice }: any = getDiscounts(
        selectedCoupon,
        sumOfDiscountables
      );
      const totalSum: number = sumOfNonDiscountables + discountedPrice;
      return { totalSum, discount };
    }

    return getOriginalPrice(arr);
  };

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
        총 상품 금액<span>{formatPrice(Price.originalPrice)}원</span>
      </SubTitle>
      <SubTitle>
        쿠폰할인 금액<span>{formatPrice(Price.dicountPrice)}원</span>
      </SubTitle>
      <SubTitle>
        최종 결제 금액<span>{formatPrice(Price.totalPrice)}원</span>
      </SubTitle>
    </Wrapper>
  );
}

export default React.memo(Checkout);
