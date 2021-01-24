import React, { createContext, useMemo, useReducer } from 'react';
import { INITIAL_STATE, reducer } from 'reducer/reducer';

export const CartContext = createContext(INITIAL_STATE);

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
