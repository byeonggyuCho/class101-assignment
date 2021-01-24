import React, { createContext, useMemo, useReducer } from 'react';

import { ProductItemType } from 'types/types';
import { updateObject } from 'utility/utility';
import {
  TOGGLE_ISCHECKED,
  UPDATE_AMOUNT,
  ADD_ITEM_TO_PURCHASING,
  REMOVE_PURCHASING_ITEM_FROM_CART,
  INIT_CART,
  ADD_ITEM_TO_CART,
} from 'contexts/actions';

// Context
export const CartContext = createContext([]);
export const PurchasingContext = createContext([]);

const initialState = {
  cart: [],
  purchasingCart: [],
  amount: 1,
};

// Dispatch
const toggleIsChecked = (state, action) => {
  const { id, isChecked } = action.payload;
  const updatedState = {
    ...state,
    cart: state.cart.map(item =>
      item.id === id ? { ...item, isChecked: !isChecked } : item
    ),
  };
  return updateObject(state, updatedState);
};

const updateAmount = (state, action) => {
  // id
  const updatedState = state.purchasingCart.map(item => {
    return {
      ...item,
      amount: +action.amount,
    };
  });
  return updateObject(state, updatedState);
};

const removePurchasingItemFromCart = (state, action) => {
  const updatedState = {
    ...state,
    purchasingCart: state.purchasingCart.filter(
      item => item.id !== action.payload
    ),
  };
  return updateObject(state, updatedState);
};

const initCart = (state, action) => {
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

const addItemToCart = (state, action) => {
  const { id, isChecked } = action.payload;

  const updatedState = {
    ...state,
    cart: state.cart.map(item =>
      item.id === id ? { ...item, isChecked: !isChecked } : item
    ),
  };
  return updateObject(state, updatedState);
};

const addItemToPurchasing = (state, action) => {
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
