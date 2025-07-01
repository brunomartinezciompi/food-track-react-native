import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

export function Other() {
  const colors = useColors();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="help-circle-outline" size={120} color={colors.text.tertiary} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.errorCode, { color: colors.background.tertiary }]}>404</Text>
          <Text style={[styles.title, { color: colors.text.primary }]}>Page Not Found</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Oops! The page you're looking for doesn't exist or is under construction.
          </Text>
        </View>

        <View style={[styles.featureContainer, { backgroundColor: colors.background.secondary }]}>
          <Text style={[styles.featureTitle, { color: colors.text.primary }]}>Coming Soon</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.status.success} />
              <Text style={[styles.featureText, { color: colors.text.primary }]}>Order History</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.status.success} />
              <Text style={[styles.featureText, { color: colors.text.primary }]}>Favorites</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.status.success} />
              <Text style={[styles.featureText, { color: colors.text.primary }]}>Loyalty Rewards</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.status.success} />
              <Text style={[styles.featureText, { color: colors.text.primary }]}>Delivery Tracking</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  errorCode: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  featureContainer: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
}); 