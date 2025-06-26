import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductTag, ProductTagColor } from '@/types';
import { useTranslation } from 'react-i18next';

interface ProductCardTagsProps {
  tags: ProductTag[];
}

export function ProductCardTags({ tags }: ProductCardTagsProps) {
  const { t } = useTranslation();

  if (!tags || tags.length === 0) return null;

  const getTagTextColor = (tag: ProductTag): string => {
    return tag === 'gluten-free' ? '#000' : '#FFF';
  };

  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={[styles.tag, { backgroundColor: ProductTagColor[tag] }]}>
          <Text style={[styles.tagText, { color: getTagTextColor(tag) }]}>
            {t(`home.${tag}`)}
          </Text>
        </View>
      ))}
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
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
}); 