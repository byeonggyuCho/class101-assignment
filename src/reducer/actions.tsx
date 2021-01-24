import { ChangeEvent } from 'react';
import { ProductItemType } from 'types/types';

export interface CartStateType {
  cart: ProductItemType[];
  purchasingCart: ProductItemType[];
}

export enum CartActionType {
  TOGGLE_ISCHECKED = 'TOGGLE_ISCHECKED',
  INIT_AMOUNT = 'INIT_AMOUNT',
  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
  ADD_ITEM_TO_PURCHASING = 'ADD_ITEM_TO_PURCHASING',
  REMOVE_ITEM_FROM_PURCHASING_CART = 'REMOVE_ITEM_FROM_PURCHASING_CART',
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
}

export type ActionType = {
  type: CartActionType;
  payload?: CartStateType;
};

// Action Generator
export const addItemToCart = (item: ProductItemType) => {
  return {
    type: CartActionType.ADD_ITEM_TO_CART,
    payload: item,
  };
};

export const toggleIsChekced = (item: ProductItemType) => {
  return {
    type: CartActionType.TOGGLE_ISCHECKED,
    payload: item,
  };
};

export const removeItemFromPurchasingCart = (id: string) => {
  return {
    type: CartActionType.REMOVE_ITEM_FROM_PURCHASING_CART,
    payload: id,
  };
};

export const addItemToPurchasing = (item: ProductItemType) => {
  return {
    type: CartActionType.ADD_ITEM_TO_PURCHASING,
    payload: item,
  };
};

export const changeAmount = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
  const { value } = e.target;
  return {
    type: CartActionType.UPDATE_AMOUNT,
    id: id,
    amount: value,
  };
};
