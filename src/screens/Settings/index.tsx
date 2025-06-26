import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { LanguageSelectorCard } from '@/components/LanguageSelectorCard';

export function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LanguageSelectorCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
