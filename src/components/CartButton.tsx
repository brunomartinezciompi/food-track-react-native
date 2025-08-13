import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@/hooks/useColors';
import { useCart } from '@/contexts';

export function CartButton() {
  const navigation = useNavigation();
  const colors = useColors();
  const { itemCount } = useCart();

  return (
    <TouchableOpacity 
      style={styles.cartButton} 
      onPress={() => navigation.navigate('Cart' as never)}
    >
      <Ionicons name="bag-outline" size={24} color={colors.interactive.primary} />
      {itemCount > 0 && (
        <View style={[styles.badge, { backgroundColor: colors.interactive.primary }]}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 14,
  },
}); 