import { useContext, ChangeEvent, useCallback } from 'react';
import Layout from 'components/Layout/Layout';
import styled from 'styled-components';

import { coupons } from 'assets/data/coupons';
import { CartActionType } from 'reducer/actions';
import { CartContext } from 'reducer/context';
import { ProductType } from 'types/types';
import { Title, Notice } from 'styles/styles';
import CartItem from 'components/Cart/CartItem';
import Checkout from 'components/Cart/Checkout';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 2rem 6rem 2rem 2rem;
  margin-top: 3rem;
  box-sizing: border-box;
  background-color: #f8f8f9;
`;

function cart() {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const isCartExisting: boolean = cart.length > 0;

  const handleChangeAmount = useCallback(
    (e: ChangeEvent<HTMLSelectElement>, id: string): void => {
      const { value } = e.target;
      dispatch({ type: CartActionType.UPDATE_AMOUNT, id: id, amount: value });
    },
    []
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: ProductType): void => {
      if (e.target.checked) {
        addItemToCheckout(item);
        toggleIsChekced(item);
      } else {
        removeItemFromCheckout(item.id);
        toggleIsChekced(item);
      }
    },
    []
  );

  const toggleIsChekced = (item: ProductType): void => {
    dispatch({ type: CartActionType.TOGGLE_ISCHECKED, payload: item });
  };

  const removeItemFromCheckout = (id: string): void => {
    dispatch({
      type: CartActionType.REMOVE_ITEM_FROM_CHECKOUT,
      payload: id,
    });
  };

  const addItemToCheckout = (item: ProductType): void => {
    dispatch({ type: CartActionType.ADD_ITEM_TO_CHECKOUT, payload: item });
  };

  return (
    <Layout>
      <Title>Shopping Cart</Title>
      {isCartExisting && (
        <Wrapper>
          {cart.map((item: ProductType) => (
            <CartItem
              key={item.id}
              item={item}
              onChange={handleChange}
              onChangeAmount={handleChangeAmount}
            />
          ))}
        </Wrapper>
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
