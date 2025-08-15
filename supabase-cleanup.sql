-- ============================================
-- FOODTRACK APP - CLEANUP UNUSED TABLES
-- ============================================
-- Este script elimina todas las tablas que NO se usan en la aplicación actual
-- 
-- TABLAS QUE SE MANTIENEN (en uso):
-- ✅ products, product_tags, product_ingredients, nutrition_info, product_sizes
-- ✅ orders, order_items, profiles
--
-- TABLAS QUE SE ELIMINAN (no usadas):
-- ❌ addresses, carts, cart_items, cart_item_customizations 
-- ❌ coupons, order_item_customizations, payment_methods, restaurants

-- Primero eliminar tablas que tienen foreign keys hacia otras tablas
-- (orden importante para evitar errores de dependencias)

-- 1. Cart related tables
DROP TABLE IF EXISTS cart_item_customizations CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE; 
DROP TABLE IF EXISTS carts CASCADE;

-- 2. Order customizations 
DROP TABLE IF EXISTS order_item_customizations CASCADE;

-- 3. Payment methods
DROP TABLE IF EXISTS payment_methods CASCADE;

-- 4. Address related
DROP TABLE IF EXISTS addresses CASCADE;

-- 5. Coupons
DROP TABLE IF EXISTS coupons CASCADE;

-- 6. Restaurants (single restaurant assumption)
DROP TABLE IF EXISTS restaurants CASCADE;

-- Mostrar tablas restantes para confirmar
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Las tablas que deben quedar son:
-- ✅ nutrition_info
-- ✅ order_items  
-- ✅ orders
-- ✅ product_ingredients
-- ✅ product_sizes
-- ✅ product_tags
-- ✅ products
-- ✅ profiles