import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { LanguageSelectorCard } from '@/components/LanguageSelectorCard';
import { useColors } from '@/hooks/useColors';

export function Settings() {
  const colors = useColors();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        <LanguageSelectorCard />
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
    padding: 20,
  },
});
