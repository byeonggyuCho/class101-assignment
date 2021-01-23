import React, { createContext, useState } from 'react';

import { ProductItemType } from 'types/types';

export const CartContext = createContext([]);
export const PurchasedContext = createContext([]);

function CartProvider({ children }) {
  const [cart, setCart] = useState<ProductItemType[]>([]);
  const [purchased, setPurchased] = useState<ProductItemType[]>([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <PurchasedContext.Provider value={[purchased, setPurchased]}>
        {children}
      </PurchasedContext.Provider>
    </CartContext.Provider>
  );
}

export default CartProvider;
