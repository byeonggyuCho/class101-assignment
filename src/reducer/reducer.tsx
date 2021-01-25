import { updateObject } from 'utility/utility';
import { ProductType } from 'types/types';
import { ActionType } from 'reducer/actionTypes';

export enum CartActionType {
  TOGGLE_ISCHECKED = 'TOGGLE_ISCHECKED',
  INIT_AMOUNT = 'INIT_AMOUNT',
  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  ADD_ITEM_TO_CHECKOUT = 'ADD_ITEM_TO_CHECKOUT',
  REMOVE_ITEM_FROM_CHECKOUT = 'REMOVE_ITEM_FROM_CHECKOUT',
}

interface CartStateType {
  cart: ProductType[];
  checkout: ProductType[];
}

export const INITIAL_STATE: CartStateType = {
  cart: [],
  checkout: [],
};

const toggleIsChecked = (state: CartStateType, action: ActionType) => {
  const { id, isChecked } = action.payload;
  const updatedState = {
    ...state,
    cart: state.cart.map(item =>
      item.id === id ? { ...item, isChecked: !isChecked } : item
    ),
  };
  return updateObject(state, updatedState);
};

const initAmount = (state: CartStateType, action: ActionType) => {
  const updatedCart = state.cart.map(item =>
    item.id === action.id ? { ...item, amount: 1 } : item
  );
  const updatedState = {
    ...state,
    cart: updatedCart,
  };
  return updateObject(state, updatedState);
};

const updateAmount = (state: CartStateType, action: ActionType) => {
  let updatedState;
  const isExistingOnCheckout =
    state.checkout.map(item => item.id === action.id).length > 0;

  if (isExistingOnCheckout) {
    const updatedCheckout = state.checkout.map(item =>
      item.id === action.id ? { ...item, amount: +(+action.amount) } : item
    );
    updatedState = {
      ...state,
      checkout: updatedCheckout,
    };
  } else {
    const updatedCart = state.cart.map(item =>
      item.id === action.id ? { ...item, amount: +(+action.amount) } : item
    );
    updatedState = {
      ...state,
      cart: updatedCart,
    };
  }
  return updateObject(state, updatedState);
};

const removeItemFromCheckout = (state: CartStateType, action: ActionType) => {
  const updatedState = {
    ...state,
    checkout: state.checkout.filter(item => item.id !== action.payload),
  };
  return updateObject(state, updatedState);
};

const addItemToCart = (state: CartStateType, action) => {
  const newItem = {
    ...action.payload,
    isChecked: false,
    isAddedToCart: true,
    amount: 1,
  };
  const updatedState = {
    ...state,
    cart: [...state.cart, newItem],
  };
  return updateObject(state, updatedState);
};

const removeItemFromCart = (state: CartStateType, action: ActionType) => {
  const updatedState = {
    ...state,
    cart: state.cart.filter(item => item.id !== action.payload),
  };
  return updateObject(state, updatedState);
};

const addItemToCheckout = (state: CartStateType, action: ActionType) => {
  const updatedState = {
    ...state,
    checkout: [...state.checkout, action.payload],
  };
  return updateObject(state, updatedState);
};

// REDUCER
export const reducer = (
  state: CartStateType = INITIAL_STATE,
  action: ActionType
) => {
  switch (action.type) {
    case CartActionType.TOGGLE_ISCHECKED:
      return toggleIsChecked(state, action);
    case CartActionType.UPDATE_AMOUNT:
      return updateAmount(state, action);
    case CartActionType.INIT_AMOUNT:
      return initAmount(state, action);
    case CartActionType.REMOVE_ITEM_FROM_CHECKOUT:
      return removeItemFromCheckout(state, action);
    case CartActionType.ADD_ITEM_TO_CART:
      return addItemToCart(state, action);
    case CartActionType.REMOVE_ITEM_FROM_CART:
      return removeItemFromCart(state, action);
    case CartActionType.ADD_ITEM_TO_CHECKOUT:
      return addItemToCheckout(state, action);
    default:
      return state;
  }
};
