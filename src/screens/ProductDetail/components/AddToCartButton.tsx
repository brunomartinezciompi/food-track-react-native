import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function AddToCartButton({ 
  currentPrice, 
  quantity 
}: { 
  currentPrice: number; 
  quantity: number;
}) {
  return (
    <View style={styles.bottomSection}>
      <View style={styles.bottomContent}>
        <TouchableOpacity style={styles.addToCartButton}>
          <View style={styles.addToCartContent}>
            <Ionicons name="bag-add" size={24} color="#FFFFFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
            <Text style={styles.addToCartPrice}>
              ${(currentPrice * quantity).toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bottomContent: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  addToCartButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addToCartPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 'auto',
  },
}); 