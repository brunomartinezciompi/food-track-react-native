import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageItemProps {
  language: Language;
  isSelected: boolean;
  onSelect: () => void;
}

export function LanguageItem({ language, isSelected, onSelect }: LanguageItemProps) {
  const { t } = useTranslation();

  const getLanguageDisplayName = (code: string) => {
    switch (code) {
      case 'en': return t('languages.english');
      case 'es': return t('languages.spanish');
      case 'pt': return t('languages.portuguese');
      default: return language.name;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.languageItem,
        isSelected && styles.selectedLanguageItem
      ]}
      onPress={onSelect}
    >
      <View style={styles.languageContent}>
        <Text style={styles.flag}>{language.flag}</Text>
        <Text style={[
          styles.languageName,
          isSelected && styles.selectedLanguageName
        ]}>
          {getLanguageDisplayName(language.code)}
        </Text>
      </View>
      {isSelected && (
        <Ionicons name="checkmark" size={24} color="#059669" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    minHeight: 70,
  },
  selectedLanguageItem: {
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#059669',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flag: {
    fontSize: 32,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
  },
  selectedLanguageName: {
    color: '#059669',
    fontWeight: '600',
  },
}); 