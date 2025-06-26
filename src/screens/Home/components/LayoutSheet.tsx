import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import type { LayoutMode } from './ProductCard/';

interface LayoutSheetProps {
  visible: boolean;
  onClose: () => void;
  currentMode: LayoutMode;
  onSelectMode: (mode: LayoutMode) => void;
}

export function LayoutSheet({ visible, onClose, currentMode, onSelectMode }: LayoutSheetProps) {
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
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>View Options</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.option, currentMode === 'list' && styles.selectedOption]}
            onPress={() => handleSelectMode('list')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>☰</Text>
              <View>
                <Text style={[styles.optionTitle, currentMode === 'list' && styles.selectedText]}>
                  List View
                </Text>
                <Text style={styles.optionDescription}>
                  Detailed view with full information
                </Text>
              </View>
            </View>
            {currentMode === 'list' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, currentMode === 'grid' && styles.selectedOption]}
            onPress={() => handleSelectMode('grid')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>⊞</Text>
              <View>
                <Text style={[styles.optionTitle, currentMode === 'grid' && styles.selectedText]}>
                  Grid View
                </Text>
                <Text style={styles.optionDescription}>
                  Compact view with essential info
                </Text>
              </View>
            </View>
            {currentMode === 'grid' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area padding
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  selectedOption: {
    backgroundColor: '#F8F9FA',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
    color: '#666',
    width: 30,
    textAlign: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  selectedText: {
    color: '#007AFF',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 