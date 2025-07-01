import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';
import type { LayoutMode } from './ProductCard';

interface ProductCardContentProps {
  product: Product;
  layoutMode: LayoutMode;
}

export function ProductCardContent({ product, layoutMode }: ProductCardContentProps) {
  const { t, i18n } = useTranslation();
  const colors = useColors();

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
        <Text style={[styles.gridTitle, { color: colors.text.primary }]} numberOfLines={1}>{product.name}</Text>
        <Text style={[styles.gridPrice, { color: colors.status.success }]}>${product.price.toFixed(2)}</Text>
        <Text style={[styles.gridInfo, { color: colors.text.secondary }]}>
          {product.nutritionInfo.calories} {t('productDetail.calories')} • {product.preparationTime} {t('home.preparationTime')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={1}>{product.name}</Text>
        <Text style={[styles.price, { color: colors.status.success }]}>${product.price.toFixed(2)}</Text>
      </View>
      
      <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={2}>
        {getLocalizedDescription()}
      </Text>
      
      <View style={[styles.nutritionContainer, { backgroundColor: colors.background.tertiary }]}>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text.primary }]}>{product.nutritionInfo.calories}</Text>
          <Text style={[styles.nutritionLabel, { color: colors.text.secondary }]}>{t('productDetail.calories')}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text.primary }]}>{product.nutritionInfo.protein}g</Text>
          <Text style={[styles.nutritionLabel, { color: colors.text.secondary }]}>{t('productDetail.protein')}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text.primary }]}>{product.nutritionInfo.carbs}g</Text>
          <Text style={[styles.nutritionLabel, { color: colors.text.secondary }]}>{t('productDetail.carbs')}</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text.primary }]}>{product.nutritionInfo.fat}g</Text>
          <Text style={[styles.nutritionLabel, { color: colors.text.secondary }]}>{t('productDetail.fat')}</Text>
        </View>
      </View>
      
      <View style={styles.ingredientsContainer}>
        <Text style={[styles.ingredientsTitle, { color: colors.text.primary }]}>{t('productDetail.ingredients')}:</Text>
        <Text style={[styles.ingredients, { color: colors.text.secondary }]} numberOfLines={2}>
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
    flex: 1,
    marginRight: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  nutritionLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  ingredientsContainer: {
    marginTop: 8,
  },
  ingredientsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 12,
    lineHeight: 16,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridInfo: {
    fontSize: 11,
  },
}); 