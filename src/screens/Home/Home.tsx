import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ProductList, LayoutSheet, ActiveOrderBanner } from './components';
import { Product } from '@/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useMostRecentActiveOrder, useOrderTracking } from '@/hooks/useOrders';

type HomeStackParamList = {
  HomeMain: undefined;
  Profile: { user?: string };
  Settings: undefined;
};

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { id: number };
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<HomeStackParamList & RootStackParamList>;

export type LayoutMode = 'list' | 'grid';

export function Home() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('list');
  const [sheetVisible, setSheetVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const colors = useColors();
  
  // Order tracking
  const { data: activeOrder } = useMostRecentActiveOrder();
  useOrderTracking(); // Enable real-time updates

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setSheetVisible(true)}
        >
          <Ionicons 
            name={layoutMode === 'list' ? 'list' : 'grid'} 
            size={24} 
            color={colors.interactive.primary} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, layoutMode, colors]);

  const handleProductPress = useCallback((product: Product) => {
    navigation.navigate('ProductDetail', { id: product.id });
  }, [navigation]);

  const handleLayoutChange = (mode: LayoutMode) => {
    setLayoutMode(mode);
    setSheetVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Active Order Banner */}
      {activeOrder && (
        <ActiveOrderBanner 
          order={activeOrder}
          onPress={() => {
            (navigation as any).navigate('OrderDetail', { order: activeOrder });
          }}
        />
      )}
      
      <ProductList 
        onProductPress={handleProductPress} 
        layoutMode={layoutMode}
      />
      
      <LayoutSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        currentMode={layoutMode}
        onSelectMode={handleLayoutChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
});
