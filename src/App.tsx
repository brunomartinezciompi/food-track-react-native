import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from '@navigation/index';
import './localization/i18n'; // Initialize i18n

Asset.loadAsync([
  ...NavigationAssets,
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          'foodtrackreactnative://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
