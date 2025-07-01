import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { LayoutMode } from './ProductCard/';

interface LayoutSheetProps {
  visible: boolean;
  onClose: () => void;
  currentMode: LayoutMode;
  onSelectMode: (mode: LayoutMode) => void;
}

export function LayoutSheet({ visible, onClose, currentMode, onSelectMode }: LayoutSheetProps) {
  const colors = useColors();
  
  const handleSelectMode = (mode: LayoutMode) => {
    onSelectMode(mode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={[styles.overlay, { backgroundColor: `${colors.shadow.color}80` }]} onPress={onClose}>
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
          <View style={[styles.header, { borderBottomColor: colors.border.primary }]}>
            <Text style={[styles.title, { color: colors.text.primary }]}>View Options</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.option, currentMode === 'list' && { backgroundColor: colors.background.secondary }]}
            onPress={() => handleSelectMode('list')}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionIcon, { color: colors.text.secondary }]}>☰</Text>
              <View>
                <Text style={[styles.optionTitle, { color: colors.text.primary }, currentMode === 'list' && { color: colors.interactive.primary }]}>
                  List View
                </Text>
                <Text style={[styles.optionDescription, { color: colors.text.secondary }]}>
                  Detailed view with full information
                </Text>
              </View>
            </View>
            {currentMode === 'list' && <Text style={[styles.checkmark, { color: colors.interactive.primary }]}>✓</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, currentMode === 'grid' && { backgroundColor: colors.background.secondary }]}
            onPress={() => handleSelectMode('grid')}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionIcon, { color: colors.text.secondary }]}>⊞</Text>
              <View>
                <Text style={[styles.optionTitle, { color: colors.text.primary }, currentMode === 'grid' && { color: colors.interactive.primary }]}>
                  Grid View
                </Text>
                <Text style={[styles.optionDescription, { color: colors.text.secondary }]}>
                  Compact view with essential info
                </Text>
              </View>
            </View>
            {currentMode === 'grid' && <Text style={[styles.checkmark, { color: colors.interactive.primary }]}>✓</Text>}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area padding
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
    textAlign: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 