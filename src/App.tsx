import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSyncQueriesExternal } from 'react-query-external-sync';
import * as ExpoDevice from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Navigation } from '@navigation/index';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import './localization/i18n'; // Initialize i18n

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  
  useSyncQueriesExternal({
    queryClient,
    socketURL: "http://localhost:42831",
    deviceName: `${Platform.OS} ${Platform.Version}`,
    platform: Platform.OS,
    deviceId: `${Platform.OS}-${ExpoDevice.modelName || 'simulator'}`,
    isDevice: ExpoDevice.isDevice ?? false,
    extraDeviceInfo: {
      appVersion: "1.0.0",
      modelName: ExpoDevice.modelName || "Unknown",
      osVersion: String(Platform.Version),
      brand: ExpoDevice.brand || "Unknown",
    },
    enableLogs: __DEV__,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    },
    asyncStorage: AsyncStorage,
    secureStorage: SecureStore,
    secureStorageKeys: [
      "userToken",
      "refreshToken",
      "biometricKey",
      "deviceId",
    ],
  });
  

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Navigation
              linking={{
                enabled: true,
                prefixes: [
                  // Change the scheme to match your app's scheme defined in app.json
                  'foodtrackreactnative://',
                ],
              }}
              onReady={() => {
                SplashScreen.hideAsync();
              }}
            />
            <Toast />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
