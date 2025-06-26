import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';

export function ProductHeader({ product, currentPrice }: { product: Product; currentPrice: number }) {
  const { i18n } = useTranslation();
  
  const getLocalizedDescription = () => {
    if (product.descriptions) {
      return product.descriptions[i18n.language as keyof typeof product.descriptions] || product.descriptions.en;
    }
    return product.description || '';
  };

  return (
    <View style={styles.headerSection}>
      <View style={styles.titlePriceRow}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${currentPrice.toFixed(2)}</Text>
          {product.sizes && currentPrice !== product.price && (
            <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
          )}
        </View>
      </View>
      <Text style={styles.productDescription}>{getLocalizedDescription()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    marginBottom: 32,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 20,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#059669',
  },
  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
}); 