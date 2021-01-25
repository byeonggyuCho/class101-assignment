import { ChangeEvent } from 'react';
import { ProductType } from 'types/types';

export interface CartStateType {
  cart: ProductType[];
  checkout: ProductType[];
}

export type ActionType = {
  type: CartActionType;
  payload?: ProductType | string;
  id?: string;
  amount?: string;
};

export enum CartActionType {
  TOGGLE_ISCHECKED = 'TOGGLE_ISCHECKED',
  INIT_AMOUNT = 'INIT_AMOUNT',
  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  ADD_ITEM_TO_CHECKOUT = 'ADD_ITEM_TO_CHECKOUT',
  REMOVE_ITEM_FROM_CHECKOUT = 'REMOVE_ITEM_FROM_CHECKOUT',
}

// ACTION CREATORS
// export const addItemToCart = (item: ProductType) => {
//   return {
//     type: CartActionType.ADD_ITEM_TO_CART,
//     payload: item,
//   };
// };

// export const toggleIsChekced = (item: ProductType) => {
//   return {
//     type: CartActionType.TOGGLE_ISCHECKED,
//     payload: item,
//   };
// };

// export const removeItemFromCheckout = (id: string) => {
//   return {
//     type: CartActionType.REMOVE_ITEM_FROM_CHECKOUT,
//     payload: id,
//   };
// };

// export const addItemToCheckout = (item: ProductType) => {
//   return {
//     type: CartActionType.ADD_ITEM_TO_CHECKOUT,
//     payload: item,
//   };
// };

// export const changeAmount = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
//   const { value } = e.target;
//   return {
//     type: CartActionType.UPDATE_AMOUNT,
//     id: id,
//     amount: value,
//   };
// };
