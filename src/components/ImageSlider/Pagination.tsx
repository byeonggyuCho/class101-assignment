import React, { useEffect } from 'react';
import styled from 'styled-components';

import { ProductItemsType } from 'assets/data/productItems';

const List = styled.ul`
  display: flex;
`;

const Item = styled.li<{ isCurrent: boolean }>`
  cursor: pointer;
  font-weight: ${({ isCurrent }) => (isCurrent ? 700 : 400)};

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

interface PagenationProp {
  currentPage: number;
  productItems: ProductItemsType;
  onClick: (id: number) => void;
}

const Pagination = ({ currentPage, onClick, productItems }: PagenationProp) => {
  const pageNumbers = [];
  const maxPageNumber: number = Math.ceil(productItems.length / 5);

  const handlePageNumbers = (): void => {
    for (let i = 1; i <= maxPageNumber; i++) {
      pageNumbers.push(i);
    }
  };

  const handleClickNumber = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    const target = e.target as HTMLLIElement;
    onClick(+target.id);
  };

  handlePageNumbers();

  return (
    <List>
      {pageNumbers.map((n: number) => (
        <Item
          key={n}
          id={n.toString()}
          isCurrent={currentPage === n}
          onClick={handleClickNumber}>
          {n}
        </Item>
      ))}
    </List>
  );
};

export default Pagination;
