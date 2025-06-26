import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product, ProductTag, ProductTagColor, ProductTagBackgroundColor } from '@/types';
import { useTranslation } from 'react-i18next';

const getTagColor = (tag: ProductTag): string => {
  return ProductTagColor[tag] || '#6B7280';
};

const getBackgroundColor = (product: Product): string => {
  const priorityTag = product.tags.find(tag => tag in ProductTagBackgroundColor);
  return priorityTag ? ProductTagBackgroundColor[priorityTag] : '#FFF8E1';
};

export function ProductHeroSection({ product }: { product: Product }) {
  const { t } = useTranslation();
  
  return (
    <View style={[styles.heroSection, { backgroundColor: getBackgroundColor(product) }]}>
      <Image source={{ uri: product.image }} style={styles.heroImage} />
      
      {/* Tags Overlay */}
      <View style={styles.tagsContainer}>
        {product.tags.slice(0, 2).map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: getTagColor(tag) }]}>
            <Text style={styles.tagText}>{t(`home.${tag}`).toUpperCase()}</Text>
          </View>
        ))}
      </View>

      {/* Prep Time Badge */}
      <View style={styles.prepTimeBadge}>
        <Ionicons name="time-outline" size={16} color="#FFFFFF" />
        <Text style={styles.prepTimeText}>{product.preparationTime} {t('home.preparationTime')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    height: 220,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heroImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  tagsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  prepTimeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  prepTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 