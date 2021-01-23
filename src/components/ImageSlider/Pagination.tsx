import styled from 'styled-components';

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
  count: number;
  maxPageNumber: number;
  setCount: (count: number) => void;
  setXPosition: (value: number) => void;
}

const Pagination = ({
  count,
  maxPageNumber,
  setCount,
  setXPosition,
}: PagenationProp) => {
  const pageNumbers: number[] = [];

  const handlePageNumbers = (): void => {
    for (let i = 1; i <= maxPageNumber; i++) {
      pageNumbers.push(i);
    }
  };

  const handleClickNumber = (n: number): void => {
    const width = 1280 * (n - 1);
    setXPosition(-width);
    setCount(n);
  };

  handlePageNumbers();

  return (
    <List>
      {pageNumbers.map((n: number) => (
        <Item
          key={n}
          id={n.toString()}
          isCurrent={count === n}
          onClick={() => handleClickNumber(n)}>
          {n}
        </Item>
      ))}
    </List>
  );
};

export default Pagination;
