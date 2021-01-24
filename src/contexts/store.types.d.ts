import { ProductItemType } from 'types/types';

export interface UpdateAmountType {
  type: typeof UPDATE_AMOUNT;
  amount: number;
  id: string;
}

export interface ToggleIsCheckedType {
  type: typeof TOGGLE_ISCHECKED;
  payload: ProductItemType;
}

export interface InitCartType {
  type: typeof INIT_CART;
  payload: ProductItemType;
}

export interface AppItemToCartType {
  type: typeof ADD_ITEM_TO_CART;
  payload: ProductItemType;
}

export interface AddItemToPurchasingType {
  type: typeof ADD_ITEM_TO_PURCHASING;
  payload: ProductItemType;
}

export interface RemovePurchasingItemFromCartType {
  type: typeof REMOVE_PURCHASING_ITEM_FROM_CART;
  payload: string;
}

export type CartTypes =
  | UpdateAmountType
  | ToggleIsCheckedType
  | InitCartType
  | AppItemToCartType
  | AddItemToPurchasingType
  | RemovePurchasingItemFromCartType;

export interface CartStateType {
  cart: ProductItemType[];
  purchasingCart: ProductItemType[];
  amount: number;
}
