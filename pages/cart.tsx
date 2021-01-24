import { useContext, useCallback } from 'react';
import Layout from 'components/Layout/Layout';
import styled from 'styled-components';

import {
  TOGGLE_ISCHECKED,
  ADD_ITEM_TO_PURCHASING,
  REMOVE_PURCHASING_ITEM_FROM_CART,
} from 'contexts/actions';
import { CartContext } from 'contexts/cartContext';
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

/*
Click a cart icon -> Add an item to cartList
Render cartItem based on cartList
Add cartList to PurchasedList when click cart icon
Display total sum

*/

// Change name of purchasedList

function cart() {
  const { state, dispatch } = useContext(CartContext);
  const { cart, purchasingCart, amount } = state;

  const isCarListExisting: boolean = cart.length > 0;

  const handleChange = item => {
    const { id } = item;
    const isPurchasedExisting: boolean = purchasingCart.length > 0;
    const isInitialList = cart.length === purchasingCart.length;

    if (isCarListExisting && isPurchasedExisting && !isInitialList) {
      handleToggleIsChekced(item);

      // Add an item to purchasingList if there not exsting
      // Remove an item from purchasingList if there exsting
      const isItemExistInPurchased =
        purchasingCart.map(item => item.id === id).length > 1;

      const isItemExistInCartList = cart.map(item => item.id === id).length > 1;

      console.log(isItemExistInPurchased);

      if (isItemExistInPurchased) {
        console.log('Remove');
        handleRemovePurchasedItemFromCart(id);
      } else {
        console.log('Add');
        handleAddItemToPurchasing(item);
      }
    } else if (isInitialList) {
      handleRemovePurchasedItemFromCart(id);
      handleToggleIsChekced(item);
    } else if (isCarListExisting && !isPurchasedExisting) {
      handleToggleIsChekced(item);
      handleAddItemToPurchasing(item);
    }

    // If amount is changed onChange, update item's amount of cart and purchased
  };

  const handleToggleIsChekced = item => {
    dispatch({ type: TOGGLE_ISCHECKED, payload: item });
  };

  const handleRemovePurchasedItemFromCart = id => {
    dispatch({ type: REMOVE_PURCHASING_ITEM_FROM_CART, payload: id });
  };

  const handleAddItemToPurchasing = item => {
    dispatch({ type: ADD_ITEM_TO_PURCHASING, payload: item });
  };

  const handleChangeAmount = () => console.log('TEST');
  // const handleChangeAmount = useCallback(
  //   (e, id: string): void => {
  //     const amount: string = e.target.value;
  //     const isExisting: boolean =
  //       purchasingList.filter((el: ProductItemType) => el.id === id).length > 0;

  //     setAmount(+amount);

  //     if (isExisting) {
  //       const newPurchasedList: ProductItemType[] = purchasingList.map(
  //         (item: ProductItemType) => {
  //           return {
  //             ...item,
  //             amount: +amount,
  //           };
  //         }
  //       );
  //       setPurchasingList(newPurchasedList);
  //     }
  //   },
  //   [purchasingList]
  // );

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
              amount={amount}
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
