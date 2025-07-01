import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from '@/navigation/HomeStack';
import { MoreStack } from '../More/MoreStack';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

const Tab = createBottomTabNavigator();

export function AppNavigationTabBar() {
  const { t } = useTranslation();
  const colors = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          borderTopColor: colors.border.primary,
        },
        tabBarActiveTintColor: colors.tabBar.iconSelected,
        tabBarInactiveTintColor: colors.tabBar.iconDefault,
      }}
    >
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
        name="More"
        component={MoreStack}
        options={{
          headerShown: false,
          tabBarLabel: t('navigation.more'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 