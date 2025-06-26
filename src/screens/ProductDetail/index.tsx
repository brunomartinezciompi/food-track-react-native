import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { products } from '@/assets/data/products';
import { SizeOption } from '@/types';
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
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<SizeOption>('M');
  const [quantity, setQuantity] = useState(1);

  const getCurrentPrice = () => {
    if (!product?.sizes) return product?.price || 0;
    const sizeInfo = product.sizes.find(s => s.size === selectedSize);
    return sizeInfo?.price || product.price;
  };

  if (!product) {
    return <ProductNotFound />;
  }

  const currentPrice = getCurrentPrice();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductHeroSection product={product} />
        
        <View style={styles.contentContainer}>
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 32,
  },
});