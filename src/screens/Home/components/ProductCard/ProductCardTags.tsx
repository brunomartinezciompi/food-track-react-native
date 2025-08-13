import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductTag } from '@/types';
import { useTranslation } from 'react-i18next';
import { useFoodColors } from '@hooks/useFoodColors';

interface ProductCardTagsProps {
  tags: ProductTag[];
}

export function ProductCardTags({ tags }: ProductCardTagsProps) {
  const { t } = useTranslation();
  const foodColors = useFoodColors();

  if (!tags || tags.length === 0) return null;

  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, index) => {
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
            {t(`home.${tag}`)}
          </Text>
        </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 80, // Leave space for prep time
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1.5,                    // Borde más grueso
    shadowOffset: { width: 0, height: 2 }, // Sombra más pronunciada
    shadowOpacity: 0.25,                 // Sombra más visible
    shadowRadius: 3,                     // Sombra más extendida
    elevation: 3,                        // Elevación para Android
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',                   // Más bold
    textTransform: 'uppercase',
  },
}); 