import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Updates } from './index';
import { Profile } from '../Profile';
import { Settings } from '../Settings';
import { NotFound } from '../NotFound';
import { LanguageSelector } from '../LanguageSelector';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

export function UpdatesStack() {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={Updates} options={{ title: t('navigation.profile') }} />
      <Stack.Screen name="AccountDetails" component={Profile} options={{ title: t('profile.accountDetails') }} />
      <Stack.Screen name="ProfileSettings" component={Settings} options={{ title: t('profile.settings') }} />
      <Stack.Screen name="LanguageSelector" component={LanguageSelector} options={{ title: t('settings.language') }} />
      <Stack.Screen name="Other" component={NotFound} options={{ title: t('profile.other') }} />
    </Stack.Navigator>
  );
} 