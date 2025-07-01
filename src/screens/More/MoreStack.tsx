import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { More } from './index';
import { Profile } from '../Profile';
import { Settings } from '../Settings';
import { Other } from '../Other';
import { LanguageSelector } from '../LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

const Stack = createNativeStackNavigator();

export function MoreStack() {
  const { t } = useTranslation();
  const colors = useColors();
  
  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.background.primary,
    },
    headerTintColor: colors.text.primary,
    headerTitleStyle: {
      color: colors.text.primary,
    },
    headerShadowVisible: false,
  };
  
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MoreMain" component={More} options={{ title: t('navigation.more') }} />
      <Stack.Screen name="AccountDetails" component={Profile} options={{ title: t('profile.accountDetails') }} />
      <Stack.Screen name="ProfileSettings" component={Settings} options={{ title: t('profile.settings') }} />
      <Stack.Screen name="LanguageSelector" component={LanguageSelector} options={{ title: t('settings.language') }} />
      <Stack.Screen name="Other" component={Other} options={{ title: t('profile.other') }} />
    </Stack.Navigator>
  );
} 