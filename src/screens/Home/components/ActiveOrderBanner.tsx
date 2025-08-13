import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from 'react-i18next';
import type { Order } from '@/lib/api/orders';

interface ActiveOrderBannerProps {
  order: Order;
  onPress?: () => void;
}

export function ActiveOrderBanner({ order, onPress }: ActiveOrderBannerProps) {
  const colors = useColors();
  const { t } = useTranslation();

  // Get status info
  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: 'time-outline' as const,
          color: colors.interactive.primary,
          text: t('order.status.pending'),
          bgColor: `${colors.interactive.primary}15`,
        };
      case 'confirmed':
        return {
          icon: 'checkmark-circle-outline' as const,
          color: colors.status.success,
          text: t('order.status.confirmed'),
          bgColor: `${colors.status.success}15`,
        };
      case 'preparing':
        return {
          icon: 'restaurant-outline' as const,
          color: '#FF9500',
          text: t('order.status.preparing'),
          bgColor: '#FF950015',
        };
      case 'ready':
        return {
          icon: 'bag-check-outline' as const,
          color: colors.status.success,
          text: t('order.status.ready'),
          bgColor: `${colors.status.success}15`,
        };
      case 'out_for_delivery':
        return {
          icon: 'car-outline' as const,
          color: '#007AFF',
          text: t('order.status.outForDelivery'),
          bgColor: '#007AFF15',
        };
      default:
        return {
          icon: 'time-outline' as const,
          color: colors.text.secondary,
          text: status,
          bgColor: `${colors.text.secondary}15`,
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  const firstItem = order.order_items?.[0];
  const totalItems = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Calculate estimated time remaining
  const getTimeRemaining = () => {
    if (!order.estimated_delivery_time) return null;
    
    const now = new Date();
    const estimatedTime = new Date(order.estimated_delivery_time);
    const diffMs = estimatedTime.getTime() - now.getTime();
    const diffMins = Math.max(0, Math.ceil(diffMs / (1000 * 60)));
    
    if (diffMins === 0) return t('order.arriving');
    return t('order.timeRemaining', { minutes: diffMins });
  };

  const timeRemaining = getTimeRemaining();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: statusInfo.bgColor,
          borderColor: statusInfo.color,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Status Icon */}
        <View style={[styles.iconContainer, { backgroundColor: statusInfo.color }]}>
          <Ionicons name={statusInfo.icon} size={20} color="#FFFFFF" />
        </View>

        {/* Order Info */}
        <View style={styles.orderInfo}>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
          <Text style={[styles.orderDetails, { color: colors.text.primary }]}>
            {firstItem?.products?.name}
            {totalItems > 1 && (
              <Text style={[styles.moreItems, { color: colors.text.secondary }]}>
                {' '}+ {totalItems - 1} {t('order.moreItems')}
              </Text>
            )}
          </Text>
          {timeRemaining && (
            <Text style={[styles.timeText, { color: colors.text.secondary }]}>
              {timeRemaining}
            </Text>
          )}
        </View>

        {/* Arrow */}
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={colors.text.secondary} 
        />
      </View>

      {/* Progress Bar (for preparing status) */}
      {order.status === 'preparing' && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: `${statusInfo.color}20` }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: statusInfo.color,
                  width: '60%', // You can make this dynamic based on time
                }
              ]} 
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  orderDetails: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 14,
    fontWeight: '400',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '400',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
}); 