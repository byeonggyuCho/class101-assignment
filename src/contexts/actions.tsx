// Action Types
export const TOGGLE_ISCHECKED = 'TOGGLE_ISCHECKED';
export const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
export const ADD_ITEM_TO_PURCHASING = 'ADD_ITEM_TO_PURCHASING';
export const REMOVE_PURCHASING_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_PURCHASING';
export const INIT_CART = 'INIT_CART';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
// export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

// Add types
// export interface NotesState {
//   notes: Note[];
//   labels: LabelObj[];
//   editableNote: null | Note;
// }

// Action Creator
export const updateAmount = (amount, id) => {
  return {
    type: UPDATE_AMOUNT,
    amount,
    id,
  };
};

export const toggleIsChecked = item => {
  return {
    type: TOGGLE_ISCHECKED,
    payload: item,
  };
};

export const initCart = item => {
  return {
    type: INIT_CART,
    payload: item,
  };
};

export const appItemToCart = item => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item,
  };
};

// export const removeItemFromCart = item => {
//   return {
//     type: REMOVE_ITEM_FROM_CART,
//     payload: item,
//   };
// };

export const addItemToPurchasing = item => {
  return {
    type: ADD_ITEM_TO_PURCHASING,
    payload: item,
  };
};

export const removePurchasingItemFromCart = id => {
  return {
    type: REMOVE_PURCHASING_ITEM_FROM_CART,
    payload: id,
  };
};
