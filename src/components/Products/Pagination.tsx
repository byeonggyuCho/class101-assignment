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

  const addPageNumber = (): void => {
    for (let i = 1; i <= maxPageNumber; i++) {
      pageNumbers.push(i);
    }
  };

  const handleClick = (n: number): void => {
    const width: number = 1280 * (n - 1);
    setXPosition(-width);
    setCount(n);
  };

  addPageNumber();

  return (
    <List>
      {pageNumbers.map((n: number) => (
        <Item
          key={n}
          id={n.toString()}
          isCurrent={count === n}
          onClick={() => handleClick(n)}>
          {n}
        </Item>
      ))}
    </List>
  );
};

export default Pagination;
