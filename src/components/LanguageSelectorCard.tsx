import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@/hooks/useColors';

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇧🇷' },
};

export function LanguageSelectorCard() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const colors = useColors();

  const currentLanguage = languages[i18n.language as keyof typeof languages] || languages.en;

  return (
    <TouchableOpacity 
      style={[styles.selector, { 
        backgroundColor: colors.background.primary,
        shadowColor: colors.shadow.color,
      }]} 
      onPress={() => navigation.navigate('LanguageSelector' as never)}
    >
      <View style={styles.selectorContent}>
        <View style={styles.selectorLeft}>
          <View style={[styles.iconContainer, { backgroundColor: colors.interactive.secondary }]}>
            <Ionicons name="language" size={24} color={colors.interactive.primary} />
          </View>
          <View>
            <Text style={[styles.selectorTitle, { color: colors.text.primary }]}>{t('settings.language')}</Text>
            <Text style={[styles.selectorSubtitle, { color: colors.text.secondary }]}>{t('settings.languageSubtitle')}</Text>
          </View>
        </View>
        <View style={styles.selectorRight}>
          <Text style={[styles.currentLanguage, { color: colors.text.primary }]}>
            {currentLanguage.flag}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selector: {
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  selectorSubtitle: {
    fontSize: 14,
  },
  selectorRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentLanguage: {
    fontSize: 20,
    fontWeight: '500',
  },
}); 