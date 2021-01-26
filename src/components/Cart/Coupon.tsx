import React from 'react';
import styled from 'styled-components';
import { CouponType } from 'types/types';
import { Icon } from 'styles/styles';

const CouponWrapper = styled.div`
  cursor: pointer;
  color: #ff912a;
  margin-bottom: 2rem;
`;

const CouponTitle = styled.div`
  display: flex;
  align-items: center;
`;

const CouponList = styled.ul`
  color: black;
  margin-top: 1rem;
  line-height: 1.5;
`;

const Input = styled.input`
  margin-left: 1rem;
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
              <Input
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
