import { useContext, useState } from 'react';
import styled from 'styled-components';
import { CouponType } from 'types/types';

const CouponWrapper = styled.div`
  font-size: 1rem;
  cursor: pointer;
  color: #ff912a;
  margin-bottom: 1rem;
`;

const CouponTitle = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
  }
`;

const CouponList = styled.ul`
  color: black;
  margin-top: 0.5rem;

  li {
    line-height: 1.5;
  }
`;

interface CouponProps {
  title: string;
  isClicked: boolean;
  coupons: CouponType[];
  onClick: (e) => void;
  onChange: (coupon: CouponType) => void;
}

function Coupon({ onClick, onChange, title, isClicked, coupons }: CouponProps) {
  return (
    <CouponWrapper onClick={onClick}>
      <CouponTitle>
        <p>{title}</p>
        <img src="assets/icons/bottom.svg" alt={title} />
      </CouponTitle>
      {isClicked && (
        <CouponList>
          {coupons.map(coupon => (
            <li key={coupon.title}>
              {coupon.title}
              <input type="checkbox" onChange={() => onChange(coupon)} />
            </li>
          ))}
        </CouponList>
      )}
    </CouponWrapper>
  );
}

export default Coupon;
