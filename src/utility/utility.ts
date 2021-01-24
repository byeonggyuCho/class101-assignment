import { RoutesType } from 'types/types';

export const routes: RoutesType = [
  { route: 'products', text: '상품 목록' },
  { route: 'cart', text: '장바구니' },
];

export const formatPrice = (number: number): string => {
  return number.toLocaleString();
};

export const updateObject = (
  oldState: object,
  updatedState: object
): object => {
  return {
    ...oldState,
    ...updatedState,
  };
};
