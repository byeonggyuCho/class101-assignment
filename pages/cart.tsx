import { useContext, ChangeEvent } from 'react';
import Layout from 'components/Layout/Layout';
import styled from 'styled-components';

import { CartActionType } from 'reducer/actions';
import { CartContext } from 'reducer/context';
import { ProductItemType } from 'types/types';
import { Title, Notice } from 'styles/styles';
import CartItem from 'components/Cart/CartItem';
import PurchasedItem from 'components/Cart/PurchasingItem';

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

  const isCarListExisting: boolean = cart.length > 0;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: ProductItemType
  ): void => {
    const { id } = item;
    const { checked } = e.target;

    if (checked) {
      handleAddItemToPurchasing(item);
      handleToggleIsChekced(item);
    } else {
      handleRemoveItemFromPurchasingCart(id);
      handleToggleIsChekced(item);
    }
  };

  const handleToggleIsChekced = (item: ProductItemType): void => {
    dispatch({ type: CartActionType.TOGGLE_ISCHECKED, payload: item });
  };

  const handleRemoveItemFromPurchasingCart = (id: string): void => {
    dispatch({
      type: CartActionType.REMOVE_ITEM_FROM_PURCHASING_CART,
      payload: id,
    });
  };

  const handleAddItemToPurchasing = (item: ProductItemType): void => {
    dispatch({ type: CartActionType.ADD_ITEM_TO_PURCHASING, payload: item });
  };

  const handleChangeAmount = (
    e: ChangeEvent<HTMLSelectElement>,
    id: string
  ): void => {
    const { value } = e.target;
    dispatch({ type: CartActionType.UPDATE_AMOUNT, id: id, amount: value });
  };

  return (
    <Layout>
      <Title>Shopping Cart</Title>
      {isCarListExisting && (
        <Wrapper>
          {cart.map((item: ProductItemType) => (
            <CartItem
              key={item.id}
              item={item}
              onChange={handleChange}
              onChangeAmount={handleChangeAmount}
            />
          ))}
        </Wrapper>
      )}
      {isCarListExisting ? (
        <PurchasedItem />
      ) : (
        <Notice>장바구니가 비어있습니다.</Notice>
      )}
    </Layout>
  );
}

export default cart;
