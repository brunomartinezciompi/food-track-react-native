import { supabase } from '../supabase';
import type { Product } from '@/types';

// Transform database product to app Product type
const transformProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    image: dbProduct.image,
    price: parseFloat(dbProduct.price),
    description: dbProduct.description_en, // Default to English
    descriptions: {
      en: dbProduct.description_en || '',
      es: dbProduct.description_es || '',
      pt: dbProduct.description_pt || '',
    },
    category: dbProduct.category,
    nutritionInfo: dbProduct.nutrition_info ? {
      calories: dbProduct.nutrition_info.calories,
      protein: parseFloat(dbProduct.nutrition_info.protein),
      carbs: parseFloat(dbProduct.nutrition_info.carbs),
      fat: parseFloat(dbProduct.nutrition_info.fat),
      fiber: parseFloat(dbProduct.nutrition_info.fiber),
      sugar: parseFloat(dbProduct.nutrition_info.sugar),
      sodium: parseFloat(dbProduct.nutrition_info.sodium),
    } : {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    },
    ingredients: dbProduct.product_ingredients?.map((ing: any) => ing.ingredient) || [],
    tags: dbProduct.product_tags?.map((tag: any) => tag.tag) || [],
    isAvailable: dbProduct.is_available,
    preparationTime: dbProduct.preparation_time,
    sizes: dbProduct.product_sizes?.map((size: any) => ({
      size: size.size,
      price: parseFloat(size.price),
    })) || [],
  };
};

// Fetch all products with related data
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_tags (tag),
      product_ingredients (ingredient, order_index),
      nutrition_info (*),
      product_sizes (size, price)
    `)
    .eq('is_available', true)
    .order('id');

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return data?.map(transformProduct) || [];
};

// Fetch single product by ID
export const fetchProductById = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_tags (tag),
      product_ingredients (ingredient, order_index),
      nutrition_info (*),
      product_sizes (size, price)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Product not found
    }
    console.error('Error fetching product:', error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return data ? transformProduct(data) : null;
};

 