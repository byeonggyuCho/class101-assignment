import { ProductItemType } from 'types/types';
import {
  UpdateAmountType,
  ToggleIsCheckedType,
  InitCartType,
  AppItemToCartType,
  AddItemToPurchasingType,
  RemovePurchasingItemFromCartType,
} from 'contexts/store.types';

// ACTION TYPES
export const TOGGLE_ISCHECKED = 'TOGGLE_ISCHECKED';
export const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
export const ADD_ITEM_TO_PURCHASING = 'ADD_ITEM_TO_PURCHASING';
export const REMOVE_PURCHASING_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_PURCHASING';
export const INIT_CART = 'INIT_CART';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

// ACTION CREATORS
export const updateAmount = (amount: number, id: string): UpdateAmountType => {
  return {
    type: UPDATE_AMOUNT,
    amount,
    id,
  };
};

export const toggleIsChecked = (item: ProductItemType): ToggleIsCheckedType => {
  return {
    type: TOGGLE_ISCHECKED,
    payload: item,
  };
};

export const initCart = (item: ProductItemType): InitCartType => {
  return {
    type: INIT_CART,
    payload: item,
  };
};

export const appItemToCart = (item: ProductItemType): AppItemToCartType => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item,
  };
};

export const addItemToPurchasing = (
  item: ProductItemType
): AddItemToPurchasingType => {
  return {
    type: ADD_ITEM_TO_PURCHASING,
    payload: item,
  };
};

export const removePurchasingItemFromCart = (
  id: string
): RemovePurchasingItemFromCartType => {
  return {
    type: REMOVE_PURCHASING_ITEM_FROM_CART,
    payload: id,
  };
};
