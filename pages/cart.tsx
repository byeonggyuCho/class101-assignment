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
  padding-left: 2rem;
  padding-right: 6rem;
  box-sizing: border-box;
`;

function cart() {
  const [cart, setCart] = useContext(CartContext);
  const [purchased, setPurchased] = useContext(PurchasedContext);

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
  ];

  const handleChange = useCallback(
    (item: ProductItemType): void => {
      // Toggle
      setPurchased([...purchased, item]);
    },
    [purchased]
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
