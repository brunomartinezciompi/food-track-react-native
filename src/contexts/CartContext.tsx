import React, { createContext, useContext, ReactNode } from 'react';
import { useCartViewModel } from '@/hooks/useCartViewModel';
import type { Product } from '@/types';

// Cart item interface
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  specialRequests?: string;
  unitPrice: number;
  totalPrice: number;
}

// Cart context type (same as view model return type)
type CartContextType = ReturnType<typeof useCartViewModel>;

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const cartViewModel = useCartViewModel();

  return (
    <CartContext.Provider value={cartViewModel}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 