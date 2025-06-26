import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '@/types';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardContent } from './ProductCardContent';

export type LayoutMode = 'list' | 'grid';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  layoutMode?: LayoutMode;
}

export function ProductCard({ product, onPress, layoutMode = 'list' }: ProductCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        layoutMode === 'grid' && styles.gridContainer
      ]} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <ProductCardImage product={product} layoutMode={layoutMode} />
      <ProductCardContent product={product} layoutMode={layoutMode} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gridContainer: {
    marginHorizontal: 8,
    marginVertical: 6,
    flex: 1,
    maxWidth: '48%',
  },
}); 