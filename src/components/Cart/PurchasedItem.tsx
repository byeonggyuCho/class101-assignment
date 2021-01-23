import { useContext } from 'react';
import styled from 'styled-components';

import { ProductItemType } from 'types/types';
import { PurchasedContext } from 'contexts/cartContext';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  background: grey;
`;

function PurchasedItem() {
  const [purchased, setPurchased] = useContext(PurchasedContext);

  return (
    <Wrapper>
      {purchased.map(item => (
        <div key={item.id}>
          <p key={item.id}>{item.price}</p>
          <p>쿠폰 사용하기</p>
        </div>
      ))}
    </Wrapper>
  );
}

export default PurchasedItem;
