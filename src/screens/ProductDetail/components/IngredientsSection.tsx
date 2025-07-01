import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

export function IngredientsSection({ product }: { product: Product }) {
  const { t } = useTranslation();
  const colors = useColors();
  
  const getLocalizedIngredients = () => {
    return product.ingredients.map(ingredient => 
      t(`ingredients.${ingredient}`, { defaultValue: ingredient })
    );
  };

  return (
    <View style={styles.ingredientsSection}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{t('productDetail.ingredients')}</Text>
      <Text style={[styles.ingredientsText, { 
        color: colors.text.primary,
        backgroundColor: colors.background.secondary,
      }]}>
        {getLocalizedIngredients().join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  ingredientsSection: {
    marginBottom: 32,
  },
  ingredientsText: {
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    borderRadius: 12,
  },
}); 