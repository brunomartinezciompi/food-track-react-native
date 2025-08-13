import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Home } from '@/screens/Home/Home';
import { Profile } from '@/screens/Profile';
import { Settings } from '@/screens/Settings';
import { CartScreen } from '@/screens/Cart';
import { OrderDetailScreen } from '@/screens/OrderDetail';
import { CartButton } from '@/components/CartButton';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

type HomeStackParamList = {
  HomeMain: undefined;
  Profile: { user?: string };
  Settings: undefined;
  Cart: undefined;
  OrderDetail: { order: any };
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
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={Home} 
        options={{ 
          title: t('navigation.ourMenu'),
          headerRight: () => <CartButton />,
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
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={({ navigation }) => ({
          presentation: 'modal',
          title: '',
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.interactive.primary,
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{ padding: 8 }}
            >
              <Ionicons name="close" size={24} color={colors.interactive.primary} />
            </TouchableOpacity>
          ),
        })} 
      />
      <Stack.Screen 
        name="OrderDetail" 
        component={OrderDetailScreen} 
        options={{
          title: t('orderDetail.orderInfo'),
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.interactive.primary,
        }} 
      />
    </Stack.Navigator>
  );
} 