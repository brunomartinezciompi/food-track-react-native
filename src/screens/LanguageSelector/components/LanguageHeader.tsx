import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

export function LanguageHeader() {
  const { t } = useTranslation();
  const colors = useColors();

  return (
    <View style={[styles.header, { borderBottomColor: colors.border.primary }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>{t('settings.selectLanguage')}</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        {t('settings.languageSubtitle')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
}); 