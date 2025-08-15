import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { createOrder, getActiveOrders, getOrderById } from '@/lib/api/orders';
import type { CreateOrderRequest, Order } from '@/lib/api/orders';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

// Query keys for orders
export const orderKeys = {
  all: ['orders'] as const,
  active: () => [...orderKeys.all, 'active'] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
};

// Hook to get active orders
export const useActiveOrders = () => {
  return useQuery({
    queryKey: orderKeys.active(),
    queryFn: getActiveOrders,
    staleTime: 30 * 1000,
    gcTime: 2 * 60 * 1000,
  });
};

// Hook to get single order
export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 30 * 1000,
    gcTime: 2 * 60 * 1000,
  });
};

// Hook to create order (mutation)
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: createOrder,
    onMutate: (variables) => {
      console.log('🚀 [ORDER_HOOK] Mutation started:', {
        variables,
        timestamp: new Date().toISOString(),
      });
    },
    onSuccess: (newOrder) => {
      console.log('🎯 [ORDER_HOOK] Order creation successful:', {
        orderId: newOrder.id,
        totalAmount: newOrder.total_amount,
        status: newOrder.status,
      });

      // Invalidate active orders to refetch
      console.log('🔄 [ORDER_HOOK] Invalidating active orders cache...');
      queryClient.invalidateQueries({ queryKey: orderKeys.active() });
      
      // Add the new order to cache
      console.log('💾 [ORDER_HOOK] Adding order to cache:', newOrder.id);
      queryClient.setQueryData(orderKeys.detail(newOrder.id), newOrder);
      
      // Show success message
      console.log('🎉 [ORDER_HOOK] Showing success toast and navigating to home');
      Toast.show({
        type: 'success',
        text1: '¡Pedido creado!',
        text2: 'Tu pedido está siendo procesado',
      });

      // Navigate back to Home
      navigation.navigate('MainTabs' as never);
    },
    onError: (error, variables) => {
      console.error('💥 [ORDER_HOOK] Order creation failed:', {
        error: error.message,
        variables,
        timestamp: new Date().toISOString(),
      });
      
      Toast.show({
        type: 'error',
        text1: 'Error al crear pedido',
        text2: error.message || 'Intenta nuevamente',
      });
    },
  });
};

// Hook for real-time order updates
export const useOrderTracking = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('📡 [ORDER_TRACKING] Initializing real-time order tracking...');
    
    // Subscribe to order updates
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          console.log('📡 [ORDER_TRACKING] Real-time order update received:', {
            orderId: payload.new?.id,
            oldStatus: payload.old?.status,
            newStatus: payload.new?.status,
            timestamp: new Date().toISOString(),
            payload: payload.new,
          });
          
          // Invalidate active orders to refetch
          console.log('🔄 [ORDER_TRACKING] Invalidating active orders cache due to real-time update');
          queryClient.invalidateQueries({ queryKey: orderKeys.active() });
          
          // Update specific order in cache if we have it
          if (payload.new) {
            console.log('💾 [ORDER_TRACKING] Updating order in cache:', payload.new.id);
            queryClient.setQueryData(
              orderKeys.detail(payload.new.id),
              (oldData: Order | undefined) => {
                if (oldData) {
                  const updatedOrder = { ...oldData, ...payload.new };
                  console.log('✅ [ORDER_TRACKING] Order cache updated successfully');
                  return updatedOrder;
                }
                console.log('⚠️ [ORDER_TRACKING] Order not found in cache, skipping update');
                return oldData;
              }
            );
          }

          // Show toast for status changes
          if (payload.new?.status) {
            const statusMessages = {
              confirmed: '¡Pedido confirmado!',
              preparing: '👨‍🍳 Preparando tu pedido',
              ready: '✅ Pedido listo',
              out_for_delivery: '🚚 En camino',
              delivered: '🎉 ¡Pedido entregado!',
            };

            const message = statusMessages[payload.new.status as keyof typeof statusMessages];
            if (message) {
              console.log('🔔 [ORDER_TRACKING] Showing status change notification:', {
                status: payload.new.status,
                message,
              });
              
              Toast.show({
                type: 'success',
                text1: message,
                text2: payload.new.status === 'delivered' ? 'Gracias por tu compra' : undefined,
              });
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 [ORDER_TRACKING] Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ [ORDER_TRACKING] Successfully subscribed to order updates');
        }
      });

    // Cleanup subscription
    return () => {
      console.log('🔌 [ORDER_TRACKING] Cleaning up order tracking subscription');
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};

// Helper to get the most recent active order
export const useMostRecentActiveOrder = () => {
  const { data: activeOrders, ...rest } = useActiveOrders();
  
  const mostRecentOrder = activeOrders?.[0] || null;
  
  console.log('🎯 [ORDER_HOOK] Most recent active order:', {
    hasOrder: !!mostRecentOrder,
    orderId: mostRecentOrder?.id,
    status: mostRecentOrder?.status,
    totalActiveOrders: activeOrders?.length || 0,
  });
  
  return {
    data: mostRecentOrder,
    ...rest,
  };
};

// Hook to cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      console.log('🚫 [ORDER_HOOK] Cancelling order:', { orderId });
      
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('❌ [ORDER_HOOK] Failed to cancel order:', error);
        throw new Error(`Failed to cancel order: ${error.message}`);
      }

      console.log('✅ [ORDER_HOOK] Order cancelled successfully:', {
        orderId: data.id,
        status: data.status,
      });

      return data;
    },
    onSuccess: (data) => {
      console.log('🔄 [ORDER_HOOK] Order cancelled, invalidating caches...', {
        cancelledOrderId: data.id,
        newStatus: data.status,
      });
      
      // Invalidate and refetch orders
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({ queryKey: orderKeys.active() });
      
      console.log('✅ [ORDER_HOOK] Cache invalidation completed');
      
      Toast.show({
        type: 'success',
        text1: 'Order Cancelled',
        text2: 'Your order has been cancelled successfully',
      });
    },
    onError: (error) => {
      console.error('❌ [ORDER_HOOK] Cancel order failed:', error);
      
      Toast.show({
        type: 'error',
        text1: 'Cancel Failed',
        text2: 'Unable to cancel order. Please try again.',
      });
    },
  });
}; 