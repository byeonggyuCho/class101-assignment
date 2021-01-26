import React from 'react';
import styled from 'styled-components';
import { CouponType } from 'types/types';
import { Icon } from 'styles/styles';

const CouponWrapper = styled.div`
  font-size: 1rem;
  cursor: pointer;
  color: #ff912a;
  margin-bottom: 1rem;
`;

const CouponTitle = styled.div`
  display: flex;
  align-items: center;
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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    coupon: CouponType
  ) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Coupon({ title, isClicked, coupons, onChange, onClick }: CouponProps) {
  return (
    <CouponWrapper onClick={onClick}>
      <CouponTitle>
        <p>{title}</p>
        <Icon src="assets/icons/bottom.svg" alt={title} />
      </CouponTitle>
      {isClicked && (
        <CouponList>
          {coupons.map(coupon => (
            <li key={coupon.title}>
              {coupon.title}
              <input
                id={coupon.type}
                type="checkbox"
                onChange={e => onChange(e, coupon)}
              />
            </li>
          ))}
        </CouponList>
      )}
    </CouponWrapper>
  );
}

export default React.memo(Coupon);
