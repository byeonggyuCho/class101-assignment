import styled from 'styled-components';

import { ItemType } from 'assets/data/productItems';
import { formatPrice } from 'utility/utility';

const Wrapper = styled.div`
  margin: 1rem;
  height: 20rem;
  flex: 227px 0 0;
  background: orange;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 10rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 1rem;
  text-align: center;
  padding: 0 0.4rem;
`;

const Price = styled.h3`
  font-size: 1rem;
  text-align: center;
`;

interface CardProps {
  produnctItem: ItemType;
}

function Card({ produnctItem }: CardProps) {
  const { title, coverImage, price } = produnctItem;

  return (
    <Wrapper>
      <ImageWrapper>
        <Img src={coverImage} alt={title} />
        <Title>{title}</Title>
        <Price>{formatPrice(price)}원</Price>
      </ImageWrapper>
    </Wrapper>
  );
}

export default Card;
