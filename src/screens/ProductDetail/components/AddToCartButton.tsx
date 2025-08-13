import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts';
import type { Product } from '@/types';
import Toast from 'react-native-toast-message';

export function AddToCartButton({ 
  currentPrice, 
  quantity,
  product,
  selectedSize,
  specialRequests,
}: { 
  currentPrice: number; 
  quantity: number;
  product: Product;
  selectedSize?: string;
  specialRequests?: string;
}) {
  const navigation = useNavigation();
  const colors = useColors();
  const { t } = useTranslation();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    console.log('🛒 [CART] User clicked add to cart:', {
      product: product.name,
      quantity,
      selectedSize,
      totalPrice: (currentPrice * quantity).toFixed(2),
    });

    addItem({
      product,
      quantity,
      selectedSize,
      specialRequests,
      unitPrice: currentPrice,
    });

    Toast.show({
      type: 'success',
      text1: t('cart.itemAdded'),
      text2: `${product.name} ${t('cart.addedToCart')}`,
    });

    // Navigate back after adding to cart
    navigation.goBack();
  };
  
  return (
    <View style={[styles.bottomSection, { 
      backgroundColor: colors.background.primary,
      borderTopColor: colors.border.primary,
    }]}>
      <View style={styles.bottomContent}>
        <TouchableOpacity 
          style={[styles.addToCartButton, { 
            backgroundColor: colors.status.success,
            shadowColor: colors.status.success,
          }]}
          onPress={handleAddToCart}
        >
          <View style={styles.addToCartContent}>
            <Ionicons name="bag-add" size={24} color="#FFFFFF" />
            <Text style={styles.addToCartText}>
              {t('productDetail.addToCart')}
            </Text>
            <Text style={styles.addToCartPrice}>
              ${(currentPrice * quantity).toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    borderTopWidth: 1,
  },
  bottomContent: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  addToCartButton: {
    borderRadius: 16,
    padding: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addToCartPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 'auto',
  },
}); 