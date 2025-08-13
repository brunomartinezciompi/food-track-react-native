import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@/hooks/useColors';
import { useCart } from '@/contexts';

export function HeaderButtons() {
  const navigation = useNavigation();
  const colors = useColors();
  const { itemCount } = useCart();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.cartButton} 
        onPress={() => navigation.navigate('Cart' as never)}
      >
        <Ionicons name="bag-outline" size={20} color={colors.interactive.primary} />
        {itemCount > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.status.error }]}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Profile' as never)}
      >
        <Ionicons name="person" size={18} color={colors.interactive.primary} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Settings' as never)}
      >
        <Ionicons name="settings-outline" size={22} color={colors.interactive.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 