import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

export function QuantitySelector({ 
  quantity, 
  onQuantityChange 
}: { 
  quantity: number; 
  onQuantityChange: (quantity: number) => void;
}) {
  const colors = useColors();
  
  return (
    <View style={styles.quantitySection}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quantity</Text>
      <View style={[styles.quantityControls, { backgroundColor: colors.background.secondary }]}>
        <TouchableOpacity
          style={[
            styles.quantityButton, 
            { 
              backgroundColor: colors.background.primary,
              shadowColor: colors.shadow.color,
            },
            quantity <= 1 && { backgroundColor: colors.background.tertiary }
          ]}
          onPress={() => quantity > 1 && onQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Ionicons 
            name="remove" 
            size={20} 
            color={quantity <= 1 ? colors.text.tertiary : colors.text.primary} 
          />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: colors.text.primary }]}>{quantity}</Text>
        <TouchableOpacity
          style={[styles.quantityButton, { 
            backgroundColor: colors.background.primary,
            shadowColor: colors.shadow.color,
          }]}
          onPress={() => onQuantityChange(quantity + 1)}
        >
          <Ionicons name="add" size={20} color={colors.text.primary} />
        </TouchableOpacity>
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
  quantitySection: {
    marginBottom: 32,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
}); 