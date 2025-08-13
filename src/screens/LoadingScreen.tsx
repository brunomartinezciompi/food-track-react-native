import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@hooks/useColors';

export default function LoadingScreen() {
  const colors = useColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F4E5D3' }]}>
      <View style={styles.content}>
        <ActivityIndicator 
          size="large" 
          color={colors.interactive.primary} 
        />
        <Text style={[styles.loadingText, { color: colors.text.tertiary }]}>
          Cargando...
        </Text>
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
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
}); 