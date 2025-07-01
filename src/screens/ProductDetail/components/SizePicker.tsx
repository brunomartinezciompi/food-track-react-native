import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product, SizeOption, ProductSize } from '@/types';
import { useColors } from '@/hooks/useColors';

export function SizePicker({ 
  product, 
  selectedSize, 
  onSizeSelect 
}: { 
  product: Product; 
  selectedSize: SizeOption; 
  onSizeSelect: (size: SizeOption) => void;
}) {
  const colors = useColors();
  
  if (!product.sizes) return null;

  return (
    <View style={styles.sizeSection}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Choose Size</Text>
      <View style={styles.sizeOptions}>
        {product.sizes.map((sizeInfo: ProductSize) => (
          <TouchableOpacity
            key={sizeInfo.size}
            style={[
              styles.sizeOption,
              { 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.primary,
              },
              selectedSize === sizeInfo.size && {
                backgroundColor: colors.interactive.primary + '20', // 20% opacity
                borderColor: colors.interactive.primary,
              }
            ]}
            onPress={() => onSizeSelect(sizeInfo.size)}
          >
            <Text style={[
              styles.sizeText,
              { color: colors.text.primary },
              selectedSize === sizeInfo.size && { color: colors.interactive.primary }
            ]}>
              {sizeInfo.size}
            </Text>
          </TouchableOpacity>
        ))}
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
  sizeSection: {
    marginBottom: 32,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeOption: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
}); 