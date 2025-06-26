import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';
import type { LayoutMode } from './ProductCard';

interface ProductCardContentProps {
  product: Product;
  layoutMode: LayoutMode;
}

export function ProductCardContent({ product, layoutMode }: ProductCardContentProps) {
  const { t, i18n } = useTranslation();

  const getLocalizedDescription = (): string => {
    if (product.descriptions) {
      return product.descriptions[i18n.language as keyof typeof product.descriptions] || product.descriptions.en;
    }
    return product.description || '';
  };

  const getLocalizedIngredients = (): string[] => {
    return product.ingredients.map(ingredient => 
      t(`ingredients.${ingredient}`, { defaultValue: ingredient })
    );
  };

  if (layoutMode === 'grid') {
    return (
      <View style={styles.gridContentContainer}>
        <Text style={styles.gridTitle} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.gridPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.gridInfo}>
          {product.nutritionInfo.calories} {t('productDetail.calories')} • {product.preparationTime} {t('home.preparationTime')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {getLocalizedDescription()}
      </Text>
      
      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{product.nutritionInfo.calories}</Text>
          <Text style={styles.nutritionLabel}>{t('productDetail.calories')}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{product.nutritionInfo.protein}g</Text>
          <Text style={styles.nutritionLabel}>{t('productDetail.protein')}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{product.nutritionInfo.carbs}g</Text>
          <Text style={styles.nutritionLabel}>{t('productDetail.carbs')}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{product.nutritionInfo.fat}g</Text>
          <Text style={styles.nutritionLabel}>{t('productDetail.fat')}</Text>
        </View>
      </View>
      
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>{t('productDetail.ingredients')}:</Text>
        <Text style={styles.ingredients} numberOfLines={2}>
          {getLocalizedIngredients().join(', ')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  gridContentContainer: {
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  nutritionLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  ingredientsContainer: {
    marginTop: 8,
  },
  ingredientsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  gridInfo: {
    fontSize: 11,
    color: '#666',
  },
}); 