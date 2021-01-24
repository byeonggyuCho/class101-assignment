import React, { createContext, useMemo, useReducer } from 'react';

import {
  TOGGLE_ISCHECKED,
  UPDATE_AMOUNT,
  ADD_ITEM_TO_PURCHASING,
  REMOVE_PURCHASING_ITEM_FROM_CART,
  INIT_CART,
  ADD_ITEM_TO_CART,
} from 'contexts/actions';
import {
  ToggleIsCheckedType,
  UpdateAmountType,
  InitCartType,
  AppItemToCartType,
  AddItemToPurchasingType,
  RemovePurchasingItemFromCartType,
  CartTypes,
  CartStateType,
} from 'contexts/store.types';
import { updateObject } from 'utility/utility';

// Context
export const CartContext = createContext([]);
export const PurchasingContext = createContext([]);

const initialState: CartStateType = {
  cart: [],
  purchasingCart: [],
  amount: 1,
};

// Dispatch
const toggleIsChecked = (state: CartStateType, action: ToggleIsCheckedType) => {
  const { id, isChecked } = action.payload;
  const updatedState = {
    ...state,
    cart: state.cart.map(item =>
      item.id === id ? { ...item, isChecked: !isChecked } : item
    ),
  };
  return updateObject(state, updatedState);
};

const updateAmount = (state: CartStateType, action: UpdateAmountType) => {
  // id
  const updatedState = state.purchasingCart.map(item => {
    return {
      ...item,
      amount: +action.amount,
    };
  });
  return updateObject(state, updatedState);
};

const removePurchasingItemFromCart = (
  state: CartStateType,
  action: RemovePurchasingItemFromCartType
) => {
  const updatedState = {
    ...state,
    purchasingCart: state.purchasingCart.filter(
      item => item.id !== action.payload
    ),
  };
  return updateObject(state, updatedState);
};

const initCart = (state: CartStateType, action: InitCartType) => {
  const newItem = {
    ...action.payload,
    isAddedToCart: true,
    isChecked: true,
    amount: 1,
  };
  const updatedState = {
    ...state,
    cart: [...state.cart, newItem],
    purchasingCart: [...state.cart, newItem],
  };

  return updateObject(state, updatedState);
};

const addItemToCart = (state: CartStateType, action: AppItemToCartType) => {
  const { id, isChecked } = action.payload;

  const updatedState = {
    ...state,
    cart: state.cart.map(item =>
      item.id === id ? { ...item, isChecked: !isChecked } : item
    ),
  };
  return updateObject(state, updatedState);
};

const addItemToPurchasing = (
  state: CartStateType,
  action: AddItemToPurchasingType
) => {
  const updatedState = {
    ...state,
    purchasingCart: [...state.purchasingCart, action.payload],
  };
  return updateObject(state, updatedState);
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ISCHECKED:
      return toggleIsChecked(state, action);
    case UPDATE_AMOUNT:
      return updateAmount(state, action);
    case REMOVE_PURCHASING_ITEM_FROM_CART:
      return removePurchasingItemFromCart(state, action);
    case INIT_CART:
      return initCart(state, action);
    case ADD_ITEM_TO_CART:
      return addItemToCart(state, action);
    case ADD_ITEM_TO_PURCHASING:
      return addItemToPurchasing(state, action);
    default:
      return state;
  }
};

function CartProvider({ children }) {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const contextValue: any = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
