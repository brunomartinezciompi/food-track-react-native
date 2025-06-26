import { HeaderButton, Text } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotFound, AppNavigationTabBar } from '@/screens';
import { ProductDetail } from '@/screens/ProductDetail';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

function RootStack() {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator>
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
              <Ionicons name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="NotFound" 
        component={NotFound}
        options={{
          title: '404',
        }}
      />
    </Stack.Navigator>
  );
}

export function Navigation({ linking, onReady }: { linking?: any; onReady?: () => void }) {
  return (
    <NavigationContainer linking={linking} onReady={onReady}>
      <RootStack />
    </NavigationContainer>
  );
}

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { id: number };
  NotFound: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 