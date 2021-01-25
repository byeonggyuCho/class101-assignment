export type ActionType = {
  type: CartActionType;
  payload?: ProductType | string;
  id?: string;
  amount?: string;
};

export interface ToggleIsChekced {
  type: CartActionType.TOGGLE_ISCHECKED;
  payload: ProductType;
}

export interface UpdateAmount {
  type: CartActionType.UPDATE_AMOUNT;
  id: string;
  amount: string;
}

export interface AddItemToCheckout {
  type: CartActionType.ADD_ITEM_TO_CHECKOUT;
  payload: ProductType;
}

export interface RemoveItemFromCheckout {
  type: CartActionType.REMOVE_ITEM_FROM_CHECKOUT;
  payload: string;
}

export interface AddItemToCart {
  type: CartActionType.ADD_ITEM_TO_CART;
  payload: ProductType;
}

export interface RemoveItemFromCart {
  type: CartActionType.REMOVE_ITEM_FROM_CART;
  payload: string;
}
