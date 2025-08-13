import { HeaderButton, Text } from '@react-navigation/elements';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import type { LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Other, AppNavigationTabBar } from '@/screens';
import { ProductDetail } from '@/screens/ProductDetail';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { useColors } from '@/hooks/useColors';
import { useAuthContext } from '../../contexts/AuthContext';
import AuthStack from '../AuthStack';
import LoadingScreen from '../../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

function MainStack() {
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
        name="MainTabs" 
        component={AppNavigationTabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetail}
        options={({ navigation }) => ({
          title: t('productDetail.title', { defaultValue: 'Product Details' }),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="NotFound" 
        component={Other}
        options={{
          title: '404',
        }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthContext();

  // Show loading screen while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show auth stack if not authenticated, main app if authenticated
  return isAuthenticated ? <MainStack /> : <AuthStack />;
}

type MainStackParamList = {
  MainTabs: undefined;
  ProductDetail: { id: number };
  NotFound: undefined;
};

interface NavigationProps {
  linking?: LinkingOptions<MainStackParamList>;
  onReady?: () => void;
}

export function Navigation({ linking, onReady }: NavigationProps) {
  const { isDark } = useTheme();
  const colors = useColors();
  
  // Crear tema personalizado basado en nuestros colores
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.interactive.primary,
      background: colors.background.primary,
      card: colors.background.card,
      text: colors.text.primary,
      border: colors.border.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme} linking={linking} onReady={onReady}>
      <RootNavigator />
    </NavigationContainer>
  );
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
} 