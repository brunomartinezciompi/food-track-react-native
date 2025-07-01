import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

export function NutritionFacts({ product }: { product: Product }) {
  const { t } = useTranslation();
  const colors = useColors();
  
  return (
    <View style={styles.nutritionSection}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{t('productDetail.nutritionFacts')}</Text>
      <View style={[styles.nutritionGrid, { backgroundColor: colors.background.secondary }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  nutritionSection: {
    marginBottom: 32,
  },
  nutritionGrid: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  nutritionItem: {
    flex: 1,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
}); 