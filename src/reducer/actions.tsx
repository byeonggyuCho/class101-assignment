import { CartActionType } from 'reducer/reducer';
import { ProductType } from 'types/types';
import {
  ToggleIsChekced,
  UpdateAmount,
  AddItemToCheckout,
  RemoveItemFromCheckout,
  AddItemToCart,
  RemoveItemFromCart,
} from 'reducer/actionTypes';

export const toggleIsChekced = (item: ProductType): ToggleIsChekced => {
  return {
    type: CartActionType.TOGGLE_ISCHECKED,
    payload: item,
  };
};

export const updateAmount = (id: string, amount: string): UpdateAmount => {
  return {
    type: CartActionType.UPDATE_AMOUNT,
    id,
    amount,
  };
};

export const addItemToCheckout = (item: ProductType): AddItemToCheckout => {
  return {
    type: CartActionType.ADD_ITEM_TO_CHECKOUT,
    payload: item,
  };
};

export const removeItemFromCheckout = (id: string): RemoveItemFromCheckout => {
  return {
    type: CartActionType.REMOVE_ITEM_FROM_CHECKOUT,
    payload: id,
  };
};

export const addItemToCart = (item: ProductType): AddItemToCart => {
  return {
    type: CartActionType.ADD_ITEM_TO_CART,
    payload: item,
  };
};

export const removeItemFromCart = (id: string): RemoveItemFromCart => {
  return {
    type: CartActionType.REMOVE_ITEM_FROM_CART,
    payload: id,
  };
};
