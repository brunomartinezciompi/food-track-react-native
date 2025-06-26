import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { LayoutMode } from '@/screens/Home/Home';

export function HomeHeaderLeftLayoutToggle({ layoutMode, onPress }: { layoutMode: LayoutMode; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Ionicons
        name={layoutMode === 'list' ? 'grid-outline' : 'list-outline'}
        size={22}
        color="#007AFF"
      />
    </TouchableOpacity>
  );
}

export function HomeHeaderRightProfileSettings({ onProfile, onSettings }: { onProfile: () => void; onSettings: () => void }) {
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={onProfile} style={styles.headerButton}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color="#007AFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSettings} style={styles.headerButton}>
        <Ionicons name="settings-outline" size={22} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 