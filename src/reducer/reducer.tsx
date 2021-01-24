import { CartActionType } from 'reducer/actions';
import { updateObject } from 'utility/utility';

export const INITIAL_STATE = {
  cart: [],
  purchasingCart: [],
};

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

const initAmount = (state, action) => {
  const updatedCart = state.cart.map(item =>
    item.id === action.id ? { ...item, amount: 1 } : item
  );
  const updatedState = {
    ...state,
    cart: updatedCart,
  };
  return updateObject(state, updatedState);
};

const updateAmount = (state, action) => {
  let updatedState;
  const isExistingOnPurchasingCart =
    state.purchasingCart.map(item => item.id === action.id).length > 0;

  if (isExistingOnPurchasingCart) {
    const updatedPurchasingCart = state.purchasingCart.map(item =>
      item.id === action.id ? { ...item, amount: +(+action.amount) } : item
    );
    updatedState = {
      ...state,
      purchasingCart: updatedPurchasingCart,
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

const removeItemFromPurchasingCart = (state, action) => {
  const updatedState = {
    ...state,
    purchasingCart: state.purchasingCart.filter(
      item => item.id !== action.payload
    ),
  };
  return updateObject(state, updatedState);
};

const addItemToCart = (state, action) => {
  const newItem = {
    ...action.payload,
    isChecked: false,
    amount: 1,
  };
  const updatedState = {
    ...state,
    cart: [...state.cart, newItem],
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

// REDUCER
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionType.TOGGLE_ISCHECKED:
      return toggleIsChecked(state, action);
    case CartActionType.UPDATE_AMOUNT:
      return updateAmount(state, action);
    case CartActionType.INIT_AMOUNT:
      return initAmount(state, action);
    case CartActionType.REMOVE_ITEM_FROM_PURCHASING_CART:
      return removeItemFromPurchasingCart(state, action);
    case CartActionType.ADD_ITEM_TO_CART:
      return addItemToCart(state, action);
    case CartActionType.ADD_ITEM_TO_PURCHASING:
      return addItemToPurchasing(state, action);
    default:
      return state;
  }
};
