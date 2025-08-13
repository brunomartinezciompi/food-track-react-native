import { useQuery } from '@tanstack/react-query';
import { 
  fetchProducts, 
  fetchProductById
} from '@/lib/api/products';
import type { Product } from '@/types';

// Query keys for consistent caching
export const productKeys = {
  all: ['products'] as const,
  detail: (id: number) => ['products', 'detail', id] as const,
};

// Hook to fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Hook to fetch single product by ID
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};



 