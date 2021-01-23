import styled from 'styled-components';

import { ItemType } from 'assets/data/productItems';
import { formatPrice } from 'utility/utility';

const Wrapper = styled.div`
  width: calc(1280px / 5 + 3px);
  height: 20rem;
  flex-shrink: 0;
  padding-right: 15px;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 10rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  padding: 1rem 0.5rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  text-align: center;
  line-height: 1.3;
`;

const Price = styled.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 700;
  margin-top: 2.5rem;
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
        <Content>
          <Title>{title}</Title>
          <Price>{formatPrice(price)}원</Price>
        </Content>
      </ImageWrapper>
    </Wrapper>
  );
}

export default Card;
