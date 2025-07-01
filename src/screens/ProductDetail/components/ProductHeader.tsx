import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

export function ProductHeader({ product, currentPrice }: { product: Product; currentPrice: number }) {
  const { i18n } = useTranslation();
  const colors = useColors();
  
  const getLocalizedDescription = () => {
    if (product.descriptions) {
      return product.descriptions[i18n.language as keyof typeof product.descriptions] || product.descriptions.en;
    }
    return product.description || '';
  };

  return (
    <View style={styles.headerSection}>
      <View style={styles.titlePriceRow}>
        <Text style={[styles.productTitle, { color: colors.text.primary }]}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.currentPrice, { color: colors.status.success }]}>${currentPrice.toFixed(2)}</Text>
          {product.sizes && currentPrice !== product.price && (
            <Text style={[styles.originalPrice, { color: colors.text.tertiary }]}>${product.price.toFixed(2)}</Text>
          )}
        </View>
      </View>
      <Text style={[styles.productDescription, { color: colors.text.secondary }]}>{getLocalizedDescription()}</Text>
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
    flex: 1,
    marginRight: 16,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 20,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
}); 