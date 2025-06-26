import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';

export function NutritionFacts({ product }: { product: Product }) {
  const { t } = useTranslation();
  
  return (
    <View style={styles.nutritionSection}>
      <Text style={styles.sectionTitle}>{t('productDetail.nutritionFacts')}</Text>
      <View style={styles.nutritionGrid}>
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
  nutritionSection: {
    marginBottom: 32,
  },
  nutritionGrid: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
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
    color: '#111827',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'lowercase',
  },
}); 