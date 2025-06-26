import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/Home/Home';
import { Profile } from '@/screens/Profile';
import { Settings } from '@/screens/Settings';
import { useTranslation } from 'react-i18next';

type HomeStackParamList = {
  HomeMain: undefined;
  Profile: { user?: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={Home} options={{ title: t('navigation.ourMenu') }} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
} 