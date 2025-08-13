-- ============================================
-- FOODTRACK APP - CLEANUP SCRIPT
-- ============================================
-- Run this FIRST to clean up any existing tables/triggers

-- Drop triggers first (with conditional checks)
DO $$
BEGIN
  -- Drop trigger on auth.users if it exists
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created' AND tgrelid = 'auth.users'::regclass) THEN
    DROP TRIGGER on_auth_user_created ON auth.users;
  END IF;
  
  -- Drop other triggers if tables exist
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN
    DROP TRIGGER IF EXISTS update_products_updated_at ON products;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'addresses') THEN
    DROP TRIGGER IF EXISTS update_addresses_updated_at ON addresses;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_methods') THEN
    DROP TRIGGER IF EXISTS update_payment_methods_updated_at ON payment_methods;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'restaurants') THEN
    DROP TRIGGER IF EXISTS update_restaurants_updated_at ON restaurants;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'carts') THEN
    DROP TRIGGER IF EXISTS update_carts_updated_at ON carts;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cart_items') THEN
    DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
  END IF;
END $$;

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS order_item_customizations CASCADE;
DROP TABLE IF EXISTS cart_item_customizations CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS product_sizes CASCADE;
DROP TABLE IF EXISTS nutrition_info CASCADE;
DROP TABLE IF EXISTS product_ingredients CASCADE;
DROP TABLE IF EXISTS product_tags CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Drop any remaining policies (they should be dropped with tables, but just in case)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can insert own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can view own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can insert own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can update own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can delete own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can view own cart" ON carts;
DROP POLICY IF EXISTS "Users can insert own cart" ON carts;
DROP POLICY IF EXISTS "Users can update own cart" ON carts;
DROP POLICY IF EXISTS "Users can delete own cart" ON carts;
DROP POLICY IF EXISTS "Users can view own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can insert own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can delete own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can view own cart item customizations" ON cart_item_customizations;
DROP POLICY IF EXISTS "Users can insert own cart item customizations" ON cart_item_customizations;
DROP POLICY IF EXISTS "Users can update own cart item customizations" ON cart_item_customizations;
DROP POLICY IF EXISTS "Users can delete own cart item customizations" ON cart_item_customizations;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Users can insert own order items" ON order_items;
DROP POLICY IF EXISTS "Users can view own order item customizations" ON order_item_customizations;
DROP POLICY IF EXISTS "Users can insert own order item customizations" ON order_item_customizations;
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Anyone can view product tags" ON product_tags;
DROP POLICY IF EXISTS "Anyone can view product ingredients" ON product_ingredients;
DROP POLICY IF EXISTS "Anyone can view nutrition info" ON nutrition_info;
DROP POLICY IF EXISTS "Anyone can view product sizes" ON product_sizes;
DROP POLICY IF EXISTS "Anyone can view restaurants" ON restaurants;
DROP POLICY IF EXISTS "Anyone can view active coupons" ON coupons;

-- Success message
SELECT 'Database cleaned successfully! Now run the main schema script.' as message; 