import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useColors } from '@hooks/useColors';

export default function LoadingScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ActivityIndicator 
        size="large" 
        color={colors.interactive.primary} 
        style={styles.spinner}
      />
      <Text style={[styles.text, { color: colors.text.secondary }]}>
        Cargando Food Track...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  spinner: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 