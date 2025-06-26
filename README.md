# 🍕 FoodTrack - React Native Learning Project

A food delivery app built with React Native + Expo to learn key concepts: **Navigation**, **Presentation**, **Localization**, and **UI**.

## 🎯 Learning Focus

### 🧭 Navigation
- **Tab Navigation**: Home + More tabs
- **Stack Navigation**: Separate stacks per tab
- **Deep Linking**: Product detail navigation
- **Type-safe Navigation**: TypeScript with React Navigation

### 🎨 Presentation & UI
- **Modal Presentations**: Layout sheet, restaurant info
- **Product Cards**: Grid/List toggle with animations
- **Size Selection**: Interactive picker with pricing
- **Header Buttons**: Custom header components
- **Responsive Design**: Adaptive layouts

### 🌍 Localization (i18n)
- **Multi-language**: EN, ES, PT
- **Dynamic Switching**: Real-time language changes
- **Localized Content**: Product descriptions, ingredients, UI text
- **Translation Keys**: Organized JSON structure

### 🔧 TypeScript & Data
- **Union Types**: `Size`, `ProductCategory`, `ProductTag`
- **Product Data**: 10+ pizzas with nutrition, ingredients, pricing
- **Type Safety**: Full TypeScript coverage
- **Helper Functions**: Product filtering and queries

## 🚀 Quick Start

```bash
npm install
npx expo start
```

## 📁 Key Files

```
src/
├── navigation/
│   ├── HomeStack.tsx       # Home tab stack
│   └── root/index.tsx      # Root tab navigator
├── screens/
│   ├── Home/               # Product list + layout toggle
│   ├── ProductDetail/      # Product detail + size picker
│   ├── More/              # Settings menu
│   └── TabBar/            # Bottom tab bar
├── localization/
│   └── translations/      # EN/ES/PT JSON files
├── assets/data/
│   └── products.ts        # Product catalog + types
└── types.ts              # TypeScript definitions
```

## 🎯 Key Concepts Implemented

### Navigation Structure
```typescript
// Tab-based with separate stacks
Root Navigator
├── Home Tab (HomeStack)
│   ├── Home (Product List)
│   ├── ProductDetail
│   ├── Profile
│   └── Settings
└── More Tab (MoreStack)
    ├── More (Menu)
    ├── Profile
    ├── Settings
    └── LanguageSelector
```

### TypeScript Types
```typescript
type Size = 'S' | 'M' | 'L' | 'XL';
type ProductCategory = 'pizza' | 'burger' | 'pasta';
type ProductTag = 'vegetarian' | 'popular' | 'spicy';

interface Product {
  id: number;
  descriptions: LocalizedDescriptions;
  sizes?: ProductSize[];
  tags: ProductTag[];
}
```

### Localization
```typescript
// Dynamic language switching
const { t, i18n } = useTranslation();
i18n.changeLanguage('es'); // Real-time switch

// Localized product data
descriptions: {
  en: 'Classic pepperoni pizza',
  es: 'Pizza clásica de pepperoni',
  pt: 'Pizza clássica de pepperoni'
}
```

## 🔍 What I Learned

- **React Navigation**: Tab + Stack navigation patterns
- **Modal Presentations**: Layout sheets and overlays
- **i18n**: Multi-language support with i18next
- **TypeScript**: Union types, interfaces, type safety
- **Component Architecture**: Modular, reusable components
- **Data Management**: Structured product data with types

## 🛠️ Tech Stack

- **React Native** + **Expo**
- **TypeScript**
- **React Navigation v6**
- **i18next** (localization)
- **Ionicons** (icons)

---

**Learning Project** - Focus on navigation, presentation, localization, and UI patterns.
