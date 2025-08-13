import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useProduct } from '@/hooks/useProducts';
import { SizeOption } from '@/types';
import { useColors } from '@/hooks/useColors';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import {
  ProductNotFound,
  ProductHeroSection,
  ProductHeader,
  SizePicker,
  NutritionFacts,
  IngredientsSection,
  QuantitySelector,
  AddToCartButton
} from './components';

type ProductDetailRouteProp = RouteProp<
 { ProductDetail: { id: number } },
 'ProductDetail'
>;

export function ProductDetail() {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  const colors = useColors();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  const { data: product, isLoading, error } = useProduct(id);
  
  const [selectedSize, setSelectedSize] = useState<SizeOption>('M');
  const [quantity, setQuantity] = useState(1);

  const getCurrentPrice = () => {
    if (!product?.sizes) return product?.price || 0;
    const sizeInfo = product.sizes.find(s => s.size === selectedSize);
    return sizeInfo?.price || product.price;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.interactive.primary} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            {t('common.loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return <ProductNotFound />;
  }

  const currentPrice = getCurrentPrice();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={colors.background.primary} 
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductHeroSection product={product} />
        
        <View style={[
          styles.contentContainer, 
          { borderTopColor: colors.border.subtle }
        ]}>
          <ProductHeader product={product} currentPrice={currentPrice} />
          
          <SizePicker 
            product={product}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
          
          <NutritionFacts product={product} />
          
          <IngredientsSection product={product} />
          
          <QuantitySelector 
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
        </View>
      </ScrollView>
      
      <AddToCartButton 
        currentPrice={currentPrice}
        quantity={quantity}
        product={product}
        selectedSize={selectedSize}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 32,
    borderTopWidth: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});