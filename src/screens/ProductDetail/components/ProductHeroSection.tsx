import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/types';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';
import { useFoodColors } from '@/hooks/useFoodColors';

export function ProductHeroSection({ product }: { product: Product }) {
  const { t } = useTranslation();
  const colors = useColors();
  const foodColors = useFoodColors();
  
  return (
    <View style={[styles.heroSection, { backgroundColor: colors.background.image }]}>
      <Image 
        source={{ uri: product.image }} 
        style={[styles.heroImage, { shadowColor: colors.shadow.color }]} 
      />
      
      {/* Tags Overlay */}
      <View style={styles.tagsContainer}>
        {product.tags.slice(0, 2).map((tag, index) => {
          const tagStyle = foodColors.getTagStyle(tag);
          return (
            <View key={index} style={[
              styles.tag, 
              { 
                backgroundColor: tagStyle.background,
                borderColor: tagStyle.border,
              }
            ]}>
              <Text style={[styles.tagText, { color: tagStyle.text }]}>
                {t(`home.${tag}`).toUpperCase()}
              </Text>
          </View>
          );
        })}
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
    height: 240,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  heroImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  tagsContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,                    // Borde más grueso
    shadowOffset: { width: 0, height: 3 }, // Sombra más pronunciada
    shadowOpacity: 0.3,                  // Sombra más visible
    shadowRadius: 4,                     // Sombra más extendida
    elevation: 4,                        // Elevación para Android
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',                   // Más bold
  },
  prepTimeBadge: {
    position: 'absolute',
    top: 30,
    right: 30,
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