import { useState } from 'react';
import type { CartItem } from '@/contexts';
import type { Product } from '@/types';

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, itemCount };
};

export const useCartViewModel = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate totals from items
  const { subtotal, itemCount } = calculateTotals(items);

  const addItem = (itemData: { 
    product: Product; 
    quantity: number; 
    selectedSize?: string; 
    specialRequests?: string; 
    unitPrice: number; 
  }) => {
    const newItem: CartItem = {
      ...itemData,
      id: `${itemData.product.id}-${itemData.selectedSize || 'default'}-${Date.now()}`,
      totalPrice: itemData.unitPrice * itemData.quantity,
    };

    setItems(currentItems => {
      // Check if item already exists (same product, size, special requests)
      const existingItemIndex = currentItems.findIndex(
        item =>
          item.product.id === newItem.product.id &&
          item.selectedSize === newItem.selectedSize &&
          item.specialRequests === newItem.specialRequests
      );

      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedItems = currentItems.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                totalPrice: (item.quantity + newItem.quantity) * item.unitPrice,
              }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...currentItems, newItem];
      }

      const { subtotal: newSubtotal, itemCount: newItemCount } = calculateTotals(updatedItems);

      console.log('🛒 [CART_VM] Item added:', {
        product: newItem.product.name,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        totalItems: newItemCount,
        subtotal: newSubtotal.toFixed(2),
      });

      return updatedItems;
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => {
      const updatedItems = currentItems.filter(item => item.id !== id);
      const { subtotal: newSubtotal, itemCount: newItemCount } = calculateTotals(updatedItems);

      console.log('🗑️ [CART_VM] Item removed:', {
        itemId: id,
        remainingItems: newItemCount,
        subtotal: newSubtotal.toFixed(2),
      });

      return updatedItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(currentItems => {
      const updatedItems = currentItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.unitPrice,
            }
          : item
      );

      const { subtotal: newSubtotal, itemCount: newItemCount } = calculateTotals(updatedItems);

      console.log('🔄 [CART_VM] Quantity updated:', {
        itemId: id,
        newQuantity: quantity,
        totalItems: newItemCount,
        subtotal: newSubtotal.toFixed(2),
      });

      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log('🧹 [CART_VM] Cart cleared');
    setItems([]);
  };

  const isEmpty = items.length === 0;

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  const hasProduct = (productId: number, selectedSize?: string, specialRequests?: string) => {
    return items.some(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.specialRequests === specialRequests
    );
  };

  return {
    // State
    items,
    subtotal,
    itemCount,
    isEmpty,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    
    // Queries
    getItemById,
    hasProduct,
  };
}; 