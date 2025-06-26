import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { LanguageItem, LanguageHeader } from './components';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      navigation.goBack();
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <LanguageItem
      language={item}
      isSelected={item.code === i18n.language}
      onSelect={() => handleLanguageSelect(item.code)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LanguageHeader />
      
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.code}
        style={styles.languageList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  languageList: {
    flex: 1,
    padding: 20,
  },
}); 