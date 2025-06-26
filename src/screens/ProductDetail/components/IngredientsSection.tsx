import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';

export function IngredientsSection({ product }: { product: Product }) {
  const { t } = useTranslation();
  
  const getLocalizedIngredients = () => {
    return product.ingredients.map(ingredient => 
      t(`ingredients.${ingredient}`, { defaultValue: ingredient })
    );
  };

  return (
    <View style={styles.ingredientsSection}>
      <Text style={styles.sectionTitle}>{t('productDetail.ingredients')}</Text>
      <Text style={styles.ingredientsText}>
        {getLocalizedIngredients().join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  ingredientsSection: {
    marginBottom: 32,
  },
  ingredientsText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
}); 