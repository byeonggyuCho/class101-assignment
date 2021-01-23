import React, { createContext, useState } from 'react';

import { ProductItemType } from 'types/types';

export const CartContext = createContext([]);
export const PurchasedContext = createContext([]);

function CartProvider({ children }) {
  const [cartList, setCartList] = useState<ProductItemType[]>([]);
  const [purchasedList, setPurchasedList] = useState<ProductItemType[]>([]);

  return (
    <CartContext.Provider value={[cartList, setCartList]}>
      <PurchasedContext.Provider value={[purchasedList, setPurchasedList]}>
        {children}
      </PurchasedContext.Provider>
    </CartContext.Provider>
  );
}

export default CartProvider;
