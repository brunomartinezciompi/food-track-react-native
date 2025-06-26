import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product, SizeOption, ProductSize } from '@/types';

export function SizePicker({ 
  product, 
  selectedSize, 
  onSizeSelect 
}: { 
  product: Product; 
  selectedSize: SizeOption; 
  onSizeSelect: (size: SizeOption) => void;
}) {
  if (!product.sizes) return null;

  return (
    <View style={styles.sizeSection}>
      <Text style={styles.sectionTitle}>Choose Size</Text>
      <View style={styles.sizeOptions}>
        {product.sizes.map((sizeInfo: ProductSize) => (
          <TouchableOpacity
            key={sizeInfo.size}
            style={[
              styles.sizeOption,
              selectedSize === sizeInfo.size && styles.selectedSizeOption
            ]}
            onPress={() => onSizeSelect(sizeInfo.size)}
          >
            <Text style={[
              styles.sizeText,
              selectedSize === sizeInfo.size && styles.selectedSizeText
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
    color: '#111827',
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
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  selectedSizeOption: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  selectedSizeText: {
    color: '#1D4ED8',
  },
}); 