import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from 'react-i18next';
import { useCancelOrder } from '@/hooks/useOrders';
import type { Order } from '@/lib/api/orders';

interface OrderDetailRouteParams {
  order: Order;
}

export function OrderDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const colors = useColors();
  const { t } = useTranslation();
  const cancelOrderMutation = useCancelOrder();
  
  const { order } = route.params as OrderDetailRouteParams;

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!order.estimated_delivery_time) return null;
    
    const now = new Date();
    const estimatedTime = new Date(order.estimated_delivery_time);
    const diffMs = estimatedTime.getTime() - now.getTime();
    const diffMins = Math.max(0, Math.ceil(diffMs / (1000 * 60)));
    
    if (diffMins === 0) return t('order.arriving');
    return t('order.timeRemaining', { minutes: diffMins });
  };

  const handleCancelOrder = () => {
    Alert.alert(
      t('orderDetail.cancelTitle'),
      t('orderDetail.cancelMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('orderDetail.confirmCancel'),
          style: 'destructive',
          onPress: () => {
            cancelOrderMutation.mutate(order.id, {
              onSuccess: () => {
                navigation.goBack();
              },
            });
          },
        },
      ]
    );
  };

  const getStatusInfo = () => {
    switch (order.status) {
      case 'pending':
        return {
          text: t('order.status.pending'),
          icon: 'checkmark-circle' as const,
          color: colors.status.warning,
        };
      case 'confirmed':
        return {
          text: t('order.status.confirmed'),
          icon: 'checkmark-circle' as const,
          color: colors.status.info,
        };
      case 'preparing':
        return {
          text: t('order.status.preparing'),
          icon: 'restaurant' as const,
          color: colors.status.warning,
        };
      case 'ready':
        return {
          text: t('order.status.ready'),
          icon: 'bag-check' as const,
          color: colors.status.success,
        };
      case 'out_for_delivery':
        return {
          text: t('order.status.outForDelivery'),
          icon: 'car' as const,
          color: colors.status.info,
        };
      default:
        return {
          text: t('order.status.pending'),
          icon: 'time' as const,
          color: colors.status.warning,
        };
    }
  };

  const statusInfo = getStatusInfo();
  const timeRemaining = getTimeRemaining();
  const totalItems = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const firstItem = order.order_items?.[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.statusContainer, { backgroundColor: statusInfo.color }]}>
            <Ionicons name={statusInfo.icon} size={24} color="#FFFFFF" />
          </View>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
          {timeRemaining && (
            <Text style={[styles.timeText, { color: colors.text.secondary }]}>
              {timeRemaining}
            </Text>
          )}
        </View>

        {/* Order Info */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {t('orderDetail.orderInfo')}
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              {t('orderDetail.orderNumber')}
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              #{order.id.slice(-8).toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              {t('orderDetail.orderTime')}
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              {new Date(order.created_at).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              {t('orderDetail.totalItems')}
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              {totalItems} {totalItems === 1 ? t('orderDetail.item') : t('orderDetail.items')}
            </Text>
          </View>
        </View>

        {/* Items */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {t('orderDetail.items')}
          </Text>
          {order.order_items?.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, { color: colors.text.primary }]}>
                  {item.products?.name}
                </Text>
                {item.special_requests && (
                  <Text style={[styles.itemNotes, { color: colors.text.tertiary }]}>
                    {item.special_requests}
                  </Text>
                )}
              </View>
              <View style={styles.itemPrice}>
                <Text style={[styles.quantity, { color: colors.text.secondary }]}>
                  x{item.quantity}
                </Text>
                <Text style={[styles.price, { color: colors.text.primary }]}>
                  ${item.total_price.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {t('orderDetail.orderSummary')}
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              {t('orderDetail.subtotal')}
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              ${order.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              {t('orderDetail.tax')}
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              ${order.tax.toFixed(2)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              {t('orderDetail.deliveryFee')}
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              ${order.delivery_fee.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.infoRow, styles.totalRow]}>
            <Text style={[styles.totalLabel, { color: colors.text.primary }]}>
              {t('orderDetail.total')}
            </Text>
            <Text style={[styles.totalValue, { color: colors.text.primary }]}>
              ${order.total_amount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Cancel Button */}
        {(order.status === 'pending' || order.status === 'confirmed') && (
          <TouchableOpacity
            style={[styles.cancelButton, { 
              backgroundColor: colors.status.error,
              opacity: cancelOrderMutation.isPending ? 0.7 : 1,
            }]}
            onPress={handleCancelOrder}
            disabled={cancelOrderMutation.isPending}
          >
            <Ionicons name="close-circle" size={20} color="#FFFFFF" />
            <Text style={styles.cancelButtonText}>
              {cancelOrderMutation.isPending ? t('common.loading') : t('orderDetail.cancelOrder')}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemNotes: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  itemPrice: {
    alignItems: 'flex-end',
  },
  quantity: {
    fontSize: 12,
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 