// Export auth types
export * from '@/types/auth';

// Product Types
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description?: string;
  descriptions?: LocalizedDescriptions;
  category: string;
  nutritionInfo: NutritionInfo;
  ingredients: string[];
  tags: ProductTag[];
  isAvailable: boolean;
  preparationTime: number; // in minutes
  sizes?: ProductSize[];
}

export interface LocalizedDescriptions {
  en: string;
  es: string;
  pt: string;
}

export interface ProductSize {
  size: SizeOption;
  price: number;
}

export type SizeOption = 'S' | 'M' | 'L' | 'XL';

export type ProductTag = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten-free' 
  | 'spicy' 
  | 'popular' 
  | 'new' 
  | 'healthy';

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
  sodium: number; // in mg
}

// Order types are now in src/lib/api/orders.ts (single source of truth)

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  apartmentNumber?: string;
  deliveryInstructions?: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  estimatedPrepTime: number; // in minutes
}

// Cart types removed - not currently used in the app 