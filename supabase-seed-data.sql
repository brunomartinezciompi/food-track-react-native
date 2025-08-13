-- ============================================
-- FOODTRACK APP - SEED DATA SCRIPT
-- ============================================
-- Insert all mock data from products.ts into Supabase tables

-- ============================================
-- INSERT PRODUCTS
-- ============================================

-- 1. Pacific Veggie (id: 5)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(5, 'Pacific Veggie', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png', 12.99, 
 'Fresh vegetables including bell peppers, mushrooms, onions, and olives',
 'Vegetales frescos incluyendo pimientos, champiñones, cebollas y aceitunas',
 'Vegetais frescos incluindo pimentões, cogumelos, cebolas e azeitonas',
 'pizza', true, 14);

-- 2. 6 Cheese (id: 10)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(10, '6 Cheese', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png', 13.29,
 'Blend of six premium cheeses for the ultimate cheese experience',
 'Mezcla de seis quesos premium para la experiencia de queso definitiva',
 'Mistura de seis queijos premium para a experiência definitiva de queijo',
 'pizza', true, 14);

-- 3. Ultimate Pepperoni (id: 1)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(1, 'Ultimate Pepperoni', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png', 12.99,
 'Classic pepperoni pizza with extra cheese and our signature sauce',
 'Pizza clásica de pepperoni con queso extra y nuestra salsa especial',
 'Pizza clássica de pepperoni com queijo extra e nosso molho especial',
 'pizza', true, 15);

-- 4. ExtravaganZZa (id: 2)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(2, 'ExtravaganZZa', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png', 14.99,
 'Loaded with pepperoni, sausage, bell peppers, onions, and mushrooms',
 'Cargada con pepperoni, salchicha, pimientos, cebollas y champiñones',
 'Carregada com pepperoni, linguiça, pimentões, cebolas e cogumelos',
 'pizza', true, 18);

-- 5. MeatZZa (id: 3)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(3, 'MeatZZa', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png', 13.47,
 'Meat lovers dream with pepperoni, sausage, ham, and bacon',
 'Sueño de los amantes de la carne con pepperoni, salchicha, jamón y tocino',
 'Sonho dos amantes de carne com pepperoni, linguiça, presunto e bacon',
 'pizza', true, 16);

-- 6. Hawaiian (id: 6)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(6, 'Hawaiian', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/hawaiin.png', 10.49,
 'Sweet and savory combination of ham and pineapple',
 'Combinación dulce y salada de jamón y piña',
 'Combinação doce e salgada de presunto e abacaxi',
 'pizza', true, 13);

-- 7. Deluxe (id: 7)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(7, 'Deluxe', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png', 16.99,
 'Premium pizza with pepperoni, sausage, mushrooms, bell peppers, and onions',
 'Pizza premium con pepperoni, salchicha, champiñones, pimientos y cebollas',
 'Pizza premium com pepperoni, linguiça, cogumelos, pimentões e cebolas',
 'pizza', true, 17);

-- 8. BBQ Chicken (id: 8)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(8, 'BBQ Chicken', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png', 12.89,
 'Grilled chicken with BBQ sauce, red onions, and cilantro',
 'Pollo a la parrilla con salsa BBQ, cebollas rojas y cilantro',
 'Frango grelhado com molho BBQ, cebolas roxas e coentro',
 'pizza', true, 16);

-- 9. Chicken Bacon Ranch (id: 9)
INSERT INTO products (id, name, image, price, description_en, description_es, description_pt, category, is_available, preparation_time) VALUES
(9, 'Chicken Bacon Ranch', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png', 13.99,
 'Creamy ranch base with grilled chicken, bacon, and mozzarella',
 'Base cremosa de ranch con pollo a la parrilla, tocino y mozzarella',
 'Base cremosa de ranch com frango grelhado, bacon e mussarela',
 'pizza', true, 15);

-- ============================================
-- INSERT PRODUCT TAGS
-- ============================================

-- Pacific Veggie tags
INSERT INTO product_tags (product_id, tag) VALUES
(5, 'vegetarian'),
(5, 'healthy');

-- 6 Cheese tags
INSERT INTO product_tags (product_id, tag) VALUES
(10, 'vegetarian');

-- Ultimate Pepperoni tags
INSERT INTO product_tags (product_id, tag) VALUES
(1, 'popular'),
(1, 'spicy');

-- ExtravaganZZa tags
INSERT INTO product_tags (product_id, tag) VALUES
(2, 'popular');

-- MeatZZa tags
INSERT INTO product_tags (product_id, tag) VALUES
(3, 'popular');

-- Deluxe tags
INSERT INTO product_tags (product_id, tag) VALUES
(7, 'popular');

-- Chicken Bacon Ranch tags
INSERT INTO product_tags (product_id, tag) VALUES
(9, 'popular');

-- ============================================
-- INSERT PRODUCT INGREDIENTS
-- ============================================

-- Pacific Veggie ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(5, 'Pizza dough', 0),
(5, 'Tomato sauce', 1),
(5, 'Mozzarella cheese', 2),
(5, 'Bell peppers', 3),
(5, 'Mushrooms', 4),
(5, 'Red onions', 5),
(5, 'Black olives', 6),
(5, 'Tomatoes', 7);

-- 6 Cheese ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(10, 'Pizza dough', 0),
(10, 'Tomato sauce', 1),
(10, 'Mozzarella', 2),
(10, 'Cheddar', 3),
(10, 'Parmesan', 4),
(10, 'Romano', 5),
(10, 'Provolone', 6),
(10, 'Asiago', 7);

-- Ultimate Pepperoni ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(1, 'Pizza dough', 0),
(1, 'Tomato sauce', 1),
(1, 'Mozzarella cheese', 2),
(1, 'Pepperoni', 3),
(1, 'Oregano', 4);

-- ExtravaganZZa ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(2, 'Pizza dough', 0),
(2, 'Tomato sauce', 1),
(2, 'Mozzarella cheese', 2),
(2, 'Pepperoni', 3),
(2, 'Italian sausage', 4),
(2, 'Bell peppers', 5),
(2, 'Onions', 6),
(2, 'Mushrooms', 7);

-- MeatZZa ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(3, 'Pizza dough', 0),
(3, 'Tomato sauce', 1),
(3, 'Mozzarella cheese', 2),
(3, 'Pepperoni', 3),
(3, 'Italian sausage', 4),
(3, 'Ham', 5),
(3, 'Bacon', 6);

-- Hawaiian ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(6, 'Pizza dough', 0),
(6, 'Tomato sauce', 1),
(6, 'Mozzarella cheese', 2),
(6, 'Ham', 3),
(6, 'Pineapple', 4);

-- Deluxe ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(7, 'Pizza dough', 0),
(7, 'Tomato sauce', 1),
(7, 'Mozzarella cheese', 2),
(7, 'Pepperoni', 3),
(7, 'Italian sausage', 4),
(7, 'Mushrooms', 5),
(7, 'Bell peppers', 6),
(7, 'Onions', 7);

-- BBQ Chicken ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(8, 'Pizza dough', 0),
(8, 'BBQ sauce', 1),
(8, 'Mozzarella cheese', 2),
(8, 'Grilled chicken', 3),
(8, 'Red onions', 4),
(8, 'Cilantro', 5);

-- Chicken Bacon Ranch ingredients
INSERT INTO product_ingredients (product_id, ingredient, order_index) VALUES
(9, 'Pizza dough', 0),
(9, 'Ranch dressing', 1),
(9, 'Mozzarella cheese', 2),
(9, 'Grilled chicken', 3),
(9, 'Bacon', 4),
(9, 'Green onions', 5);

-- ============================================
-- INSERT NUTRITION INFO
-- ============================================

-- Pacific Veggie nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(5, 220, 8.00, 34.00, 6.00, 4.00, 6.00, 420.00);

-- 6 Cheese nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(10, 290, 15.00, 33.00, 11.00, 2.00, 3.00, 580.00);

-- Ultimate Pepperoni nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(1, 285, 12.00, 36.00, 10.00, 2.00, 4.00, 640.00);

-- ExtravaganZZa nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(2, 320, 15.00, 38.00, 12.00, 3.00, 5.00, 720.00);

-- MeatZZa nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(3, 340, 18.00, 35.00, 15.00, 2.00, 4.00, 800.00);

-- Hawaiian nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(6, 260, 11.00, 36.00, 8.00, 2.00, 8.00, 560.00);

-- Deluxe nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(7, 310, 14.00, 37.00, 11.00, 3.00, 5.00, 680.00);

-- BBQ Chicken nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(8, 280, 16.00, 35.00, 9.00, 2.00, 7.00, 620.00);

-- Chicken Bacon Ranch nutrition
INSERT INTO nutrition_info (product_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES
(9, 300, 17.00, 34.00, 12.00, 2.00, 4.00, 740.00);

-- ============================================
-- INSERT PRODUCT SIZES
-- ============================================

-- Pacific Veggie sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(5, 'S', 9.99),
(5, 'M', 12.99),
(5, 'L', 15.99),
(5, 'XL', 18.99);

-- 6 Cheese sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(10, 'S', 10.29),
(10, 'M', 13.29),
(10, 'L', 16.29),
(10, 'XL', 19.29);

-- Ultimate Pepperoni sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(1, 'S', 9.99),
(1, 'M', 12.99),
(1, 'L', 15.99),
(1, 'XL', 18.99);

-- ExtravaganZZa sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(2, 'S', 11.99),
(2, 'M', 14.99),
(2, 'L', 17.99),
(2, 'XL', 20.99);

-- MeatZZa sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(3, 'S', 10.47),
(3, 'M', 13.47),
(3, 'L', 16.47),
(3, 'XL', 19.47);

-- Hawaiian sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(6, 'S', 7.49),
(6, 'M', 10.49),
(6, 'L', 13.49),
(6, 'XL', 16.49);

-- Deluxe sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(7, 'S', 13.99),
(7, 'M', 16.99),
(7, 'L', 19.99),
(7, 'XL', 22.99);

-- BBQ Chicken sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(8, 'S', 9.89),
(8, 'M', 12.89),
(8, 'L', 15.89),
(8, 'XL', 18.89);

-- Chicken Bacon Ranch sizes
INSERT INTO product_sizes (product_id, size, price) VALUES
(9, 'S', 10.99),
(9, 'M', 13.99),
(9, 'L', 16.99),
(9, 'XL', 19.99);

-- ============================================
-- SAMPLE COUPONS
-- ============================================

INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, expires_at, is_active, usage_limit) VALUES
('SAVE5', 'fixed_amount', 5.00, 20.00, NULL, '2024-12-31 23:59:59', true, 100),
('PIZZA10', 'percentage', 10.00, 15.00, 5.00, '2024-12-31 23:59:59', true, 50),
('WELCOME20', 'percentage', 20.00, 25.00, 10.00, '2024-12-31 23:59:59', true, 200);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'All product data inserted successfully! 🍕' as message; 