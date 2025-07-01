import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { ProductCard, type LayoutMode } from './ProductCard/';
import { Product } from '@/types';
import { products } from '@/assets/data/products';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

export type { LayoutMode };

interface ProductListProps {
  onProductPress?: (product: Product) => void;
  layoutMode?: LayoutMode;
}

export function ProductList({ onProductPress, layoutMode = 'list' }: ProductListProps) {
  const { t } = useTranslation();
  const colors = useColors();
  const availableProducts = products.filter(product => product.isAvailable);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard 
      product={item} 
      onPress={() => onProductPress?.(item)}
      layoutMode={layoutMode}
    />
  );

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.background.secondary }]}>
      <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
        {availableProducts.length} {t('home.itemsAvailable')}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyStateTitle, { color: colors.text.primary }]}>{t('home.noProductsTitle')}</Text>
      <Text style={[styles.emptyStateSubtitle, { color: colors.text.secondary }]}>
        {t('home.noProductsSubtitle')}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={availableProducts}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyState}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      numColumns={layoutMode === 'grid' ? 2 : 1}
      key={layoutMode} // Force re-render when layout changes
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 