import { useContext, useCallback } from 'react';
import Layout from 'components/Layout/Layout';
import styled from 'styled-components';

import { ProductItemType } from 'types/types';
import { CartContext, PurchasedContext } from 'contexts/cartContext';
import { Title } from 'styles/styles';
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
  const [cartList, setCartList] = useContext(CartContext);
  const [purchasedList, setPurchasedList] = useContext(PurchasedContext);

  const test = [
    {
      id: 'B9vUv0E0ibc0X55kVVLr',
      title: '포근한 니트로 만드는 나만의 글씨, 봉봉메이드 니트레터링 클래스',
      coverImage:
        'https://cdn.class101.net/images/3a25ecd9-d1ab-4d21-8cc1-522ea711e729',
      price: 560000,
      score: 200,
      availableCoupon: true,
    },
    {
      id: 'ZXV8mCcvbpXKm5J5snUq',
      title: '붓펜으로 그려낸 보통날, 보통의 글씨',
      coverImage:
        'https://cdn.class101.net/images/a363a069-5aaf-40cb-822e-a2cab585c37e',
      price: 240000,
      score: 350,
    },
    {
      id: 'tpP45lSwqf1X1yEEFqL4',
      title: '수놓는 발바닥과 함께 하는 꽁냥꽁냥 고양이 자수',
      coverImage:
        'https://cdn.class101.net/images/e6b7bde6-b23d-447f-9cdf-3879caf7eb13',
      price: 90000,
      score: 120,
      availableCoupon: false,
    },
  ];

  const handleChange = useCallback(
    (item: ProductItemType): void => {
      const isExisting: boolean =
        purchasedList.filter((el: ProductItemType) => el.id === item.id)
          .length > 0
          ? true
          : false;

      if (!isExisting) {
        setPurchasedList([...purchasedList, item]);
      } else {
        const newPurchased: ProductItemType[] = purchasedList.filter(
          (el: ProductItemType) => el.id !== item.id
        );
        setPurchasedList(newPurchased);
      }
    },
    [purchasedList]
  );

  return (
    <Layout>
      <Title>Shopping Cart</Title>
      <Wrapper>
        {test.map((item: ProductItemType) => (
          <CartItem key={item.id} item={item} onChange={handleChange} />
        ))}
      </Wrapper>
      <PurchasedItem />
    </Layout>
  );
}

export default cart;
