import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function QuantitySelector({ 
  quantity, 
  onQuantityChange 
}: { 
  quantity: number; 
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <View style={styles.quantitySection}>
      <Text style={styles.sectionTitle}>Quantity</Text>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
          onPress={() => quantity > 1 && onQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Ionicons name="remove" size={20} color={quantity <= 1 ? "#D1D5DB" : "#374151"} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onQuantityChange(quantity + 1)}
        >
          <Ionicons name="add" size={20} color="#374151" />
        </TouchableOpacity>
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
  quantitySection: {
    marginBottom: 32,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
}); 