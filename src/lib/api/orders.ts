import { supabase } from '../supabase';
import type { Product } from '@/types';

// Types for order creation
export interface CreateOrderRequest {
  product: Product; // Pass the full product instead of just ID
  quantity: number;
  selectedSize?: string;
  specialRequests?: string;
}

// SOLO modelo de Supabase - snake_case como en la DB
export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
  subtotal: number;
  tax: number;
  delivery_fee: number;
  total_amount: number;
  estimated_delivery_time?: string;
  actual_delivery_time?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_requests?: string;
  products?: Product;
}

// Create a new order
export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to create orders');
  }

  // Use the product data that was passed (no need to fetch)
  const product = orderData.product;

  // Calculate pricing
  let unitPrice = product.price;
  if (orderData.selectedSize && product.sizes) {
    const sizeInfo = product.sizes.find((s) => s.size === orderData.selectedSize);
    if (sizeInfo) {
      unitPrice = sizeInfo.price;
    }
  }

  const subtotal = unitPrice * orderData.quantity;
  const tax = subtotal * 0.09; // 9% tax
  const deliveryFee = 3.99;
  const totalAmount = subtotal + tax + deliveryFee;

  console.log('📦 [ORDER_API] Creating order:', {
    product: product.name,
    quantity: orderData.quantity,
    selectedSize: orderData.selectedSize || 'default',
    unitPrice: unitPrice.toFixed(2),
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
  });

  // Create the order
  const estimatedDeliveryTime = new Date(Date.now() + 25 * 60 * 1000).toISOString();
  
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal: subtotal,
      tax: tax,
      delivery_fee: deliveryFee,
      total_amount: totalAmount,
      estimated_delivery_time: estimatedDeliveryTime,
    })
    .select()
    .single();

  if (orderError) {
    console.error('❌ [ORDER_API] Failed to create order:', orderError);
    throw new Error(`Failed to create order: ${orderError.message}`);
  }

  console.log('✅ [ORDER_API] Order created successfully:', {
    orderId: newOrder.id,
    status: newOrder.status,
    totalAmount: newOrder.total_amount,
    estimatedDeliveryTime: newOrder.estimated_delivery_time,
  });

  // Create the order item
  console.log('📝 [ORDER_API] Creating order item...');
  const { data: orderItem, error: itemError } = await supabase
    .from('order_items')
    .insert({
      order_id: newOrder.id,
      product_id: orderData.product.id,
      quantity: orderData.quantity,
      unit_price: unitPrice,
      total_price: unitPrice * orderData.quantity,
      special_requests: orderData.specialRequests,
    })
    .select()
    .single();

  if (itemError) {
    console.error('❌ [ORDER_API] Failed to create order item:', itemError);
    throw new Error(`Failed to create order item: ${itemError.message}`);
  }

  console.log('✅ [ORDER_API] Order item created successfully:', {
    orderItemId: orderItem.id,
    productId: orderItem.product_id,
    quantity: orderItem.quantity,
    unitPrice: orderItem.unit_price,
    totalPrice: orderItem.total_price,
    specialRequests: orderItem.special_requests || 'None',
  });

  // Return the complete order with items
  const completeOrder = {
    ...newOrder,
    order_items: [{
      ...orderItem,
      products: product
    }]
  };

  console.log('🎉 [ORDER_API] Order creation completed successfully:', {
    orderId: completeOrder.id,
    productName: product.name,
    totalAmount: completeOrder.total_amount,
    status: completeOrder.status,
    itemCount: completeOrder.order_items?.length || 0,
    duration: `${Date.now() - new Date(completeOrder.created_at).getTime()}ms`,
  });

  return completeOrder;
};

// Get active orders (not delivered/cancelled)
export const getActiveOrders = async (): Promise<Order[]> => {
  console.log('🔍 [ORDERS_API] Fetching active orders...');
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .in('status', ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery'])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ [ORDERS_API] Failed to fetch active orders:', error);
    throw new Error(`Failed to fetch active orders: ${error.message}`);
  }

  console.log('✅ [ORDERS_API] Active orders fetched successfully:', {
    count: data?.length || 0,
    orders: data?.map(order => ({
      id: order.id,
      status: order.status,
      totalAmount: order.total_amount,
      itemCount: order.order_items?.length || 0,
    })) || [],
  });

  return data || [];
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Order not found
    }
    console.error('Error fetching order:', error);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data;
}; 