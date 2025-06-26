// Product Types
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description?: string;
  descriptions?: LocalizedDescriptions;
  category: ProductCategory;
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

// Size union type (like ProductTag)
export type Size = 'S' | 'M' | 'L' | 'XL';

// Size pricing type
export type SizePrice = {
  S: number;
  M: number;
  L: number;
  XL: number;
};

export interface ProductSize {
  size: Size;
  price: number;
}

export type SizeOption = 'S' | 'M' | 'L' | 'XL';

export type ProductCategory = 
  | 'pizza' 
  | 'burger' 
  | 'pasta' 
  | 'salad' 
  | 'dessert' 
  | 'drink' 
  | 'appetizer';

export type ProductTag = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten-free' 
  | 'spicy' 
  | 'popular' 
  | 'new' 
  | 'healthy';

// Color Enums for ProductTag
export enum ProductTagColor {
  vegetarian = '#10B981',
  vegan = '#22C55E',
  'gluten-free' = '#8B5CF6',
  spicy = '#F97316',
  popular = '#EF4444',
  new = '#8B5CF6',
  healthy = '#06B6D4',
}

export enum ProductTagBackgroundColor {
  vegetarian = '#E8F5E8',
  vegan = '#E8F5E8',
  'gluten-free' = '#F3E5F5',
  spicy = '#FFE5D9',
  popular = '#FFF3E0',
  new = '#F3E5F5',
  healthy = '#E0F7FA',
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
  sodium: number; // in mg
}

// Order Types (used in orders.ts)
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount?: number;
  couponCode?: string;
  orderDate: Date;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
  restaurantInfo: RestaurantInfo;
}

export interface OrderItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: OrderCustomization[];
  specialRequests?: string;
}

export interface OrderCustomization {
  type: CustomizationType;
  name: string;
  price: number;
  selected: boolean;
}

export type CustomizationType = 
  | 'size' 
  | 'crust' 
  | 'topping' 
  | 'sauce' 
  | 'cheese' 
  | 'extra' 
  | 'remove';

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
  type: PaymentType;
  cardLast4?: string;
  cardBrand?: CardBrand;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export type PaymentType = 
  | 'credit_card' 
  | 'debit_card' 
  | 'paypal' 
  | 'apple_pay' 
  | 'google_pay' 
  | 'cash';

export type CardBrand = 
  | 'visa' 
  | 'mastercard' 
  | 'amex' 
  | 'discover';

export interface RestaurantInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  estimatedPrepTime: number; // in minutes
}

// Cart Types
export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  estimatedTax: number;
  estimatedDeliveryFee: number;
  estimatedTotal: number;
  lastUpdated: Date;
}

export interface CartItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: OrderCustomization[];
  specialRequests?: string;
} 