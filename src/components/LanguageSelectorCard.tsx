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

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇧🇷' },
};

export function LanguageSelectorCard() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const currentLanguage = languages[i18n.language as keyof typeof languages] || languages.en;

  return (
    <TouchableOpacity 
      style={styles.selector} 
      onPress={() => navigation.navigate('LanguageSelector' as never)}
    >
      <View style={styles.selectorContent}>
        <View style={styles.selectorLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name="language" size={24} color="#059669" />
          </View>
          <View>
            <Text style={styles.selectorTitle}>{t('settings.language')}</Text>
            <Text style={styles.selectorSubtitle}>{t('settings.languageSubtitle')}</Text>
          </View>
        </View>
        <View style={styles.selectorRight}>
          <Text style={styles.currentLanguage}>
            {currentLanguage.flag}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
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
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  selectorSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectorRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentLanguage: {
    fontSize: 20,
    color: '#374151',
    fontWeight: '500',
  },
}); 