import React, { createContext, useMemo, useReducer } from 'react';
import { INITIAL_STATE, reducer } from 'reducer/reducer';
import { ActionType } from 'reducer/actionTypes';

type ContextType = {
  state: typeof INITIAL_STATE;
  dispatch: (action: ActionType) => void;
};

export const CartContext = createContext<ContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => {
    return { state, dispatch } as ContextType;
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
