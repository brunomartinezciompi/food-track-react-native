import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@/hooks/useColors';
import { useCart } from '@/contexts';
import { useCreateOrder } from '@/hooks/useOrders';
import { useTranslation } from 'react-i18next';
import type { CartItem } from '@/contexts';

export function CartScreen() {
  const navigation = useNavigation();
  const colors = useColors();
  const { t } = useTranslation();
  const { items, subtotal, itemCount, removeItem, updateQuantity, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();



  const handleCheckout = async () => {
    if (items.length === 0) return;

    console.log('🛒 [CART] Starting purchase process:', {
      itemCount,
      subtotal: subtotal.toFixed(2),
    });

    try {
      // For now, we'll create separate orders for each item
      // In the future, we could batch them or create a single order with multiple items
      const orderPromises = items.map((item) => 
        new Promise((resolve, reject) => {
          createOrderMutation.mutate({
            product: item.product,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            specialRequests: item.specialRequests,
          }, {
            onSuccess: resolve,
            onError: reject,
          });
        })
      );

      await Promise.all(orderPromises);
      
      // Only clear cart if ALL orders succeeded
      clearCart();
      console.log('✅ [CART] All orders created successfully, cart cleared');
      
    } catch (error) {
      console.error('❌ [CART] Purchase failed, keeping items in cart:', error);
      // Don't clear cart on error - user keeps their items
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.cartItem, { backgroundColor: colors.background.secondary }]}>
      <Image source={{ uri: item.product.image }} style={styles.productImage} />
      
      <View style={styles.itemDetails}>
        <Text style={[styles.productName, { color: colors.text.primary }]}>
          {item.product.name}
        </Text>
        
        {item.selectedSize && (
          <Text style={[styles.productSize, { color: colors.text.secondary }]}>
            Size: {item.selectedSize}
          </Text>
        )}
        
        {item.specialRequests && (
          <Text style={[styles.specialRequests, { color: colors.text.tertiary }]}>
            {item.specialRequests}
          </Text>
        )}
        
        <View style={styles.priceRow}>
          <Text style={[styles.unitPrice, { color: colors.text.secondary }]}>
            ${item.unitPrice.toFixed(2)} x {item.quantity}
          </Text>
          <Text style={[styles.totalPrice, { color: colors.status.success }]}>
            ${item.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: colors.background.tertiary }]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color={colors.text.primary} />
          </TouchableOpacity>
          
          <Text style={[styles.quantity, { color: colors.text.primary }]}>
            {item.quantity}
          </Text>
          
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: colors.background.tertiary }]}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color={colors.status.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bag-outline" size={80} color={colors.text.tertiary} />
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
        {t('cart.empty')}
      </Text>
      <Text style={[styles.emptyDescription, { color: colors.text.secondary }]}>
        {t('cart.emptyDescription')}
      </Text>
      <TouchableOpacity
        style={[styles.continueShoppingButton, { backgroundColor: colors.interactive.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {items.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />

          <View style={[styles.footer, { 
            backgroundColor: colors.background.primary,
            borderTopColor: colors.border.primary,
          }]}>
            <View style={styles.totalSection}>
              <Text style={[styles.totalLabel, { color: colors.text.secondary }]}>
                {t('cart.total')}:
              </Text>
              <Text style={[styles.totalAmount, { color: colors.text.primary }]}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.purchaseButton, { 
                backgroundColor: colors.status.success,
                opacity: createOrderMutation.isPending ? 0.7 : 1,
              }]}
              onPress={handleCheckout}
              disabled={createOrderMutation.isPending}
            >
              <Text style={styles.purchaseButtonText}>
                {createOrderMutation.isPending ? t('common.loading') : t('cart.purchase')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productSize: {
    fontSize: 14,
    marginBottom: 2,
  },
  specialRequests: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitPrice: {
    fontSize: 14,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  continueShoppingButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  purchaseButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 