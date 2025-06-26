import { Order, OrderStatus, Address, PaymentMethod, RestaurantInfo } from '@types';
import { products } from './products';

// Sample data (used internally)
const sampleAddresses: Address[] = [
  {
    id: 'addr_1',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    apartmentNumber: 'Apt 4B',
    deliveryInstructions: 'Ring doorbell twice',
    isDefault: true,
  },
  {
    id: 'addr_2',
    street: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    country: 'USA',
    isDefault: false,
  },
];

const samplePaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'credit_card',
    cardLast4: '4242',
    cardBrand: 'visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'apple_pay',
    isDefault: false,
  },
];

const sampleRestaurant: RestaurantInfo = {
  id: 'rest_1',
  name: 'Tony\'s Pizza Palace',
  address: '789 Pizza Street, New York, NY 10002',
  phone: '+1 (555) 123-PIZZA',
  estimatedPrepTime: 25,
};

// Orders - Main export
export const orders: Order[] = [
  {
    id: 'order_001',
    userId: 'user_123',
    items: [
      {
        id: 'item_1',
        productId: 1,
        product: products[0], // Ultimate Pepperoni
        quantity: 2,
        unitPrice: 12.99,
        totalPrice: 25.98,
        customizations: [
          {
            type: 'size',
            name: 'Large',
            price: 3.00,
            selected: true,
          },
          {
            type: 'topping',
            name: 'Extra Cheese',
            price: 1.50,
            selected: true,
          },
        ],
        specialRequests: 'Well done, please',
      },
      {
        id: 'item_2',
        productId: 4,
        product: products[3], // Margarita
        quantity: 1,
        unitPrice: 9.90,
        totalPrice: 9.90,
      },
    ],
    status: 'preparing',
    subtotal: 35.88,
    tax: 3.23,
    deliveryFee: 2.99,
    discount: 5.00,
    couponCode: 'SAVE5',
    totalAmount: 37.10,
    orderDate: new Date('2024-01-15T18:30:00Z'),
    estimatedDeliveryTime: new Date('2024-01-15T19:15:00Z'),
    deliveryAddress: sampleAddresses[0],
    paymentMethod: samplePaymentMethods[0],
    specialInstructions: 'Please call when you arrive',
    restaurantInfo: sampleRestaurant,
  },
  {
    id: 'order_002',
    userId: 'user_123',
    items: [
      {
        id: 'item_3',
        productId: 2,
        product: products[1], // ExtravaganZZa
        quantity: 1,
        unitPrice: 14.99,
        totalPrice: 14.99,
      },
    ],
    status: 'delivered',
    subtotal: 14.99,
    tax: 1.35,
    deliveryFee: 2.99,
    totalAmount: 19.33,
    orderDate: new Date('2024-01-14T19:45:00Z'),
    estimatedDeliveryTime: new Date('2024-01-14T20:30:00Z'),
    actualDeliveryTime: new Date('2024-01-14T20:25:00Z'),
    deliveryAddress: sampleAddresses[0],
    paymentMethod: samplePaymentMethods[1],
    restaurantInfo: sampleRestaurant,
  },
];

export default orders;
