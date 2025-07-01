import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/Home/Home';
import { Profile } from '@/screens/Profile';
import { Settings } from '@/screens/Settings';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

type HomeStackParamList = {
  HomeMain: undefined;
  Profile: { user?: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  const { t } = useTranslation();
  const colors = useColors();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          color: colors.text.primary,
        },
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={Home} 
        options={{ 
          title: t('navigation.ourMenu'),
        }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.text.primary,
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={{ 
          presentation: 'modal',
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.text.primary,
        }} 
      />
    </Stack.Navigator>
  );
} 