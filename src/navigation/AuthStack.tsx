import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColors } from '@hooks/useColors';
import { SignInScreen } from '../screens/SignIn';
import { SignUpScreen } from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export default function AuthStack() {
  const colors = useColors();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          color: colors.text.primary,
        },
        headerShadowVisible: false,
        animation: 'slide_from_right', // Natural stack animations
      }}
    >
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen}
        options={{
          headerShown: false, // No header for clean look
        }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          headerShown: false, // No header to save space
        }}
      />
    </Stack.Navigator>
  );
} 