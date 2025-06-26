import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '@/screens/ProductDetail';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

type ProductStackParamList = {
  ProductDetail: { id: number };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

export function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ navigation }) => ({
          title: 'Product Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 16 }}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        })}
      />
      {/* Aquí puedes agregar más pantallas globales de producto si lo necesitas */}
    </Stack.Navigator>
  );
} 