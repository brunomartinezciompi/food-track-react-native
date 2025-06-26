import { Product } from '@types';

export const products: Product[] = [
  // Productos Vegetarianos primero
  {
    id: 4,
    name: 'Margarita',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/margarita.png',
    price: 9.90,
    descriptions: {
      en: 'Traditional Italian pizza with fresh basil, mozzarella, and tomatoes',
      es: 'Pizza italiana tradicional con albahaca fresca, mozzarella y tomates',
      pt: 'Pizza italiana tradicional com manjericão fresco, mussarela e tomates',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 250,
      protein: 10,
      carbs: 32,
      fat: 8,
      fiber: 2,
      sugar: 3,
      sodium: 480,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
    tags: ['vegetarian', 'healthy'],
    isAvailable: true,
    preparationTime: 12,
    sizes: [
      { size: 'S', price: 7.90 },
      { size: 'M', price: 9.90 },
      { size: 'L', price: 12.90 },
      { size: 'XL', price: 15.90 },
    ],
  },
  {
    id: 5,
    name: 'Pacific Veggie',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png',
    price: 12.99,
    descriptions: {
      en: 'Fresh vegetables including bell peppers, mushrooms, onions, and olives',
      es: 'Vegetales frescos incluyendo pimientos, champiñones, cebollas y aceitunas',
      pt: 'Vegetais frescos incluindo pimentões, cogumelos, cebolas e azeitonas',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 220,
      protein: 8,
      carbs: 34,
      fat: 6,
      fiber: 4,
      sugar: 6,
      sodium: 420,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Bell peppers', 'Mushrooms', 'Red onions', 'Black olives', 'Tomatoes'],
    tags: ['vegetarian', 'healthy'],
    isAvailable: true,
    preparationTime: 14,
    sizes: [
      { size: 'S', price: 9.99 },
      { size: 'M', price: 12.99 },
      { size: 'L', price: 15.99 },
      { size: 'XL', price: 18.99 },
    ],
  },
  {
    id: 10,
    name: '6 Cheese',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png',
    price: 13.29,
    descriptions: {
      en: 'Blend of six premium cheeses for the ultimate cheese experience',
      es: 'Mezcla de seis quesos premium para la experiencia de queso definitiva',
      pt: 'Mistura de seis queijos premium para a experiência definitiva de queijo',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 290,
      protein: 15,
      carbs: 33,
      fat: 11,
      fiber: 2,
      sugar: 3,
      sodium: 580,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Cheddar', 'Parmesan', 'Romano', 'Provolone', 'Asiago'],
    tags: ['vegetarian'],
    isAvailable: true,
    preparationTime: 14,
    sizes: [
      { size: 'S', price: 10.29 },
      { size: 'M', price: 13.29 },
      { size: 'L', price: 16.29 },
      { size: 'XL', price: 19.29 },
    ],
  },
  // Resto de productos
  {
    id: 1,
    name: 'Ultimate Pepperoni',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
    price: 12.99,
    descriptions: {
      en: 'Classic pepperoni pizza with extra cheese and our signature sauce',
      es: 'Pizza clásica de pepperoni con queso extra y nuestra salsa especial',
      pt: 'Pizza clássica de pepperoni com queijo extra e nosso molho especial',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 10,
      fiber: 2,
      sugar: 4,
      sodium: 640,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni', 'Oregano'],
    tags: ['popular', 'spicy'],
    isAvailable: true,
    preparationTime: 15,
    sizes: [
      { size: 'S', price: 9.99 },
      { size: 'M', price: 12.99 },
      { size: 'L', price: 15.99 },
      { size: 'XL', price: 18.99 },
    ],
  },
  {
    id: 2,
    name: 'ExtravaganZZa',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
    price: 14.99,
    descriptions: {
      en: 'Loaded with pepperoni, sausage, bell peppers, onions, and mushrooms',
      es: 'Cargada con pepperoni, salchicha, pimientos, cebollas y champiñones',
      pt: 'Carregada com pepperoni, linguiça, pimentões, cebolas e cogumelos',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 320,
      protein: 15,
      carbs: 38,
      fat: 12,
      fiber: 3,
      sugar: 5,
      sodium: 720,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni', 'Italian sausage', 'Bell peppers', 'Onions', 'Mushrooms'],
    tags: ['popular'],
    isAvailable: true,
    preparationTime: 18,
    sizes: [
      { size: 'S', price: 11.99 },
      { size: 'M', price: 14.99 },
      { size: 'L', price: 17.99 },
      { size: 'XL', price: 20.99 },
    ],
  },
  {
    id: 3,
    name: 'MeatZZa',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
    price: 13.47,
    descriptions: {
      en: 'Meat lovers dream with pepperoni, sausage, ham, and bacon',
      es: 'Sueño de los amantes de la carne con pepperoni, salchicha, jamón y tocino',
      pt: 'Sonho dos amantes de carne com pepperoni, linguiça, presunto e bacon',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 340,
      protein: 18,
      carbs: 35,
      fat: 15,
      fiber: 2,
      sugar: 4,
      sodium: 800,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni', 'Italian sausage', 'Ham', 'Bacon'],
    tags: ['popular'],
    isAvailable: true,
    preparationTime: 16,
    sizes: [
      { size: 'S', price: 10.47 },
      { size: 'M', price: 13.47 },
      { size: 'L', price: 16.47 },
      { size: 'XL', price: 19.47 },
    ],
  },
  {
    id: 6,
    name: 'Hawaiian',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/hawaiin.png',
    price: 10.49,
    descriptions: {
      en: 'Sweet and savory combination of ham and pineapple',
      es: 'Combinación dulce y salada de jamón y piña',
      pt: 'Combinação doce e salgada de presunto e abacaxi',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 260,
      protein: 11,
      carbs: 36,
      fat: 8,
      fiber: 2,
      sugar: 8,
      sodium: 560,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Ham', 'Pineapple'],
    tags: [],
    isAvailable: true,
    preparationTime: 13,
    sizes: [
      { size: 'S', price: 7.49 },
      { size: 'M', price: 10.49 },
      { size: 'L', price: 13.49 },
      { size: 'XL', price: 16.49 },
    ],
  },
  {
    id: 7,
    name: 'Deluxe',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png',
    price: 16.99,
    descriptions: {
      en: 'Premium pizza with pepperoni, sausage, mushrooms, bell peppers, and onions',
      es: 'Pizza premium con pepperoni, salchicha, champiñones, pimientos y cebollas',
      pt: 'Pizza premium com pepperoni, linguiça, cogumelos, pimentões e cebolas',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 310,
      protein: 14,
      carbs: 37,
      fat: 11,
      fiber: 3,
      sugar: 5,
      sodium: 680,
    },
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni', 'Italian sausage', 'Mushrooms', 'Bell peppers', 'Onions'],
    tags: ['popular'],
    isAvailable: true,
    preparationTime: 17,
    sizes: [
      { size: 'S', price: 13.99 },
      { size: 'M', price: 16.99 },
      { size: 'L', price: 19.99 },
      { size: 'XL', price: 22.99 },
    ],
  },
  {
    id: 8,
    name: 'BBQ Chicken',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png',
    price: 12.89,
    descriptions: {
      en: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
      es: 'Pollo a la parrilla con salsa BBQ, cebollas rojas y cilantro',
      pt: 'Frango grelhado com molho BBQ, cebolas roxas e coentro',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 280,
      protein: 16,
      carbs: 35,
      fat: 9,
      fiber: 2,
      sugar: 7,
      sodium: 620,
    },
    ingredients: ['Pizza dough', 'BBQ sauce', 'Mozzarella cheese', 'Grilled chicken', 'Red onions', 'Cilantro'],
    tags: [],
    isAvailable: true,
    preparationTime: 16,
    sizes: [
      { size: 'S', price: 9.89 },
      { size: 'M', price: 12.89 },
      { size: 'L', price: 15.89 },
      { size: 'XL', price: 18.89 },
    ],
  },
  {
    id: 9,
    name: 'Chicken Bacon Ranch',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
    price: 13.99,
    descriptions: {
      en: 'Creamy ranch base with grilled chicken, bacon, and mozzarella',
      es: 'Base cremosa de ranch con pollo a la parrilla, tocino y mozzarella',
      pt: 'Base cremosa de ranch com frango grelhado, bacon e mussarela',
    },
    category: 'pizza',
    nutritionInfo: {
      calories: 300,
      protein: 17,
      carbs: 34,
      fat: 12,
      fiber: 2,
      sugar: 4,
      sodium: 740,
    },
    ingredients: ['Pizza dough', 'Ranch dressing', 'Mozzarella cheese', 'Grilled chicken', 'Bacon', 'Green onions'],
    tags: ['popular'],
    isAvailable: true,
    preparationTime: 15,
    sizes: [
      { size: 'S', price: 10.99 },
      { size: 'M', price: 13.99 },
      { size: 'L', price: 16.99 },
      { size: 'XL', price: 19.99 },
    ],
  },
];

// Helper functions for working with products
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByTag = (tag: Product['tags'][0]): Product[] => {
  return products.filter(product => product.tags.includes(tag));
};

export const getAvailableProducts = (): Product[] => {
  return products.filter(product => product.isAvailable);
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return products.filter(product => product.price >= min && product.price <= max);
};

export default products;
