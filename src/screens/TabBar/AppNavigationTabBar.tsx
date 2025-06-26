import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from '@/navigation/HomeStack';
import { UpdatesStack } from '../Updates/UpdatesStack';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export function AppNavigationTabBar() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: t('navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UpdatesStack}
        options={{
          headerShown: false,
          tabBarLabel: t('navigation.profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 