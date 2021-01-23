import { useContext, useCallback, useState } from 'react';
import Layout from 'components/Layout/Layout';
import styled from 'styled-components';

import { ProductItemType } from 'types/types';
import { CartContext, PurchasedContext } from 'contexts/cartContext';
import { Title, Notice } from 'styles/styles';
import CartItem from 'components/Cart/CartItem';
import PurchasedItem from 'components/Cart/PurchasedItem';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 2rem 6rem 2rem 2rem;
  margin-top: 3rem;
  box-sizing: border-box;
  background-color: #f8f8f9;
`;

function cart() {
  const [cartList] = useContext(CartContext);
  const [purchasedList, setPurchasedList] = useContext(PurchasedContext);
  const [amount, setAmount] = useState(1);

  const isCarListExisting: boolean = cartList.length > 0;

  const handleChange = useCallback(
    (item: ProductItemType): void => {
      const isExisting: boolean =
        purchasedList.filter((el: ProductItemType) => el.id === item.id)
          .length > 0;

      if (!isExisting) {
        const newItem = { ...item, amount: amount };
        setPurchasedList([...purchasedList, newItem]);
      } else {
        const newPurchased: ProductItemType[] = purchasedList.filter(
          (el: ProductItemType) => el.id !== item.id
        );
        setPurchasedList(newPurchased);
        setAmount(1);
      }
    },
    [amount, purchasedList]
  );

  const handleChangeAmount = useCallback(
    (e, id: string): void => {
      const amount: string = e.target.value;
      const isExisting: boolean =
        purchasedList.filter((el: ProductItemType) => el.id === id).length > 0;

      setAmount(+amount);

      if (isExisting) {
        const newPurchasedList: ProductItemType[] = purchasedList.map(
          (item: ProductItemType) => {
            return {
              ...item,
              amount: +amount,
            };
          }
        );
        setPurchasedList(newPurchasedList);
      }
    },
    [purchasedList]
  );

  return (
    <Layout>
      <Title>Shopping Cart</Title>
      {isCarListExisting && (
        <Wrapper>
          {cartList.map((item: ProductItemType) => (
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
