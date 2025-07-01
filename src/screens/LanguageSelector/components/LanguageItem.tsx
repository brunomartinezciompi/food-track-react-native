import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

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
  const colors = useColors();

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
        { backgroundColor: colors.background.secondary },
        isSelected && {
          backgroundColor: colors.status.success + '20', // 20% opacity
          borderWidth: 2,
          borderColor: colors.status.success,
        }
      ]}
      onPress={onSelect}
    >
      <View style={styles.languageContent}>
        <Text style={styles.flag}>{language.flag}</Text>
        <Text style={[
          styles.languageName,
          { color: colors.text.primary },
          isSelected && { color: colors.status.success, fontWeight: '600' }
        ]}>
          {getLanguageDisplayName(language.code)}
        </Text>
      </View>
      {isSelected && (
        <Ionicons name="checkmark" size={24} color={colors.status.success} />
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
    minHeight: 70,
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
  },
}); 