import { useContext, ChangeEvent, useCallback } from 'react';
import Layout from 'components/Layout/Layout';
import styled from 'styled-components';

import { coupons } from 'assets/data/coupons';
import { CartContext } from 'reducer/context';
import { ProductType } from 'types/types';
import { Title, Notice } from 'styles/styles';
import CartItem from 'components/Cart/CartItem';
import Checkout from 'components/Cart/Checkout';
import {
  toggleIsChekced,
  updateAmount,
  addItemToCheckout,
  removeItemFromCheckout,
} from 'reducer/actions';

const CartWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 2rem 6rem 2rem 2rem;
  margin-top: 3rem;
  box-sizing: border-box;
  background-color: #f8f8f9;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0;
  }
`;

function cart() {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const isCartExisting: boolean = cart.length > 0;

  const handleChangeAmount = useCallback(
    (e: ChangeEvent<HTMLSelectElement>, id: string): void => {
      const { value } = e.target;
      dispatch(updateAmount(id, value));
    },
    []
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: ProductType): void => {
      if (e.target.checked) {
        dispatch(addItemToCheckout(item));
        dispatch(toggleIsChekced(item));
      } else {
        dispatch(removeItemFromCheckout(item.id));
        dispatch(toggleIsChekced(item));
      }
    },
    []
  );

  return (
    <Layout>
      <Title>Shopping Cart</Title>
      {isCartExisting && (
        <CartWrapper>
          {cart.map((item: ProductType) => (
            <CartItem
              key={item.id}
              item={item}
              cart={cart}
              onChange={handleChange}
              onChangeAmount={handleChangeAmount}
            />
          ))}
        </CartWrapper>
      )}
      {isCartExisting ? (
        <Checkout coupons={coupons} />
      ) : (
        <Notice>장바구니가 비어있습니다.</Notice>
      )}
    </Layout>
  );
}

export default cart;
