import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Lato';
  font-size: 3.5rem;
  text-align: center;
  text-transform: uppercase;
  margin-top: 5rem;

  @media (max-width: 576px) {
    line-height: 1.2;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Notice = styled.p`
  text-align: center;
  margin-top: 5rem;
`;

export const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1.5rem;
  cursor: pointer;
`;
