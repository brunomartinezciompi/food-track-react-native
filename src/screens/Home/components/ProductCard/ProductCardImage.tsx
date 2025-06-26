import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Product, ProductTagBackgroundColor } from '@/types';
import { ProductCardTags } from './ProductCardTags';
import { useTranslation } from 'react-i18next';
import type { LayoutMode } from './ProductCard';

interface ProductCardImageProps {
  product: Product;
  layoutMode: LayoutMode;
}

export function ProductCardImage({ product, layoutMode }: ProductCardImageProps) {
  const { t } = useTranslation();

  const getImageBackgroundColor = (): string => {
    const priorityTag = product.tags.find(tag => tag in ProductTagBackgroundColor);
    return priorityTag ? ProductTagBackgroundColor[priorityTag] : '#FFF8E1';
  };

  return (
    <View style={[
      styles.imageContainer, 
      { backgroundColor: getImageBackgroundColor() },
      layoutMode === 'grid' && styles.gridImageContainer
    ]}>
      <Image 
        source={{ uri: product.image }} 
        style={[styles.image, layoutMode === 'grid' && styles.gridImage]} 
        resizeMode="cover" 
      />
      <ProductCardTags tags={product.tags} />
      <View style={styles.prepTimeContainer}>
        <Text style={styles.prepTime}>
          {product.preparationTime} {t('home.preparationTime')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  gridImageContainer: {
    height: 120,
    paddingVertical: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  gridImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  prepTimeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  prepTime: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
}); 