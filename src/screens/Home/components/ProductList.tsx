import React from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ProductCard, type LayoutMode } from './ProductCard/';
import { Product } from '@/types';
import { useProducts } from '@/hooks/useProducts';
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
  const { data: products, isLoading, error } = useProducts();

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard 
      product={item} 
      onPress={() => onProductPress?.(item)}
      layoutMode={layoutMode}
    />
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      <ActivityIndicator size="large" color={colors.interactive.primary} />
      <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
        {t('common.loading')}
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyStateTitle, { color: colors.text.primary }]}>
        {t('common.error')}
      </Text>
      <Text style={[styles.emptyStateSubtitle, { color: colors.text.secondary }]}>
        {error?.message || t('common.errorMessage')}
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

  if (isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return renderErrorState();
  }

  const availableProducts = products?.filter((product: Product) => product.isAvailable) || [];

  return (
    <FlatList
      data={availableProducts}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
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
    paddingTop: 8,       // Same as card's marginVertical
    paddingBottom: 20,
  },

  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
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