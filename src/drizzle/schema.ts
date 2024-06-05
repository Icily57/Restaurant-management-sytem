// schema.ts
import { drizzle, pgTable, integer, text, boolean, decimal, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { PgDialect } from 'drizzle-orm/pg-dialect';

const db = drizzle(new PgDialect({
  connectionString: process.env.DATABASE_URL!,
}));

export const Users = pgTable('users', {
  id: integer().primaryKey(),
  name: text(),
  contact_phone: text(),
  phone_verified: boolean(),
  email: text(),
  email_verified: boolean(),
  confirmation_code: text(),
  password: text(),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const Address = pgTable('address', {
  id: integer().primaryKey(),
  street_address_1: text(),
  street_address_2: text(),
  zip_code: text(),
  delivery_instructions: text(),
  user_id: integer().references(() => Users.id),
  city_id: integer().references(() => City.id),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const Category = pgTable('category', {
  id: integer().primaryKey(),
  name: text(),
});

export const City = pgTable('city', {
  id: integer().primaryKey(),
  name: text(),
  state_id: integer().references(() => State.id),
});

export const Comment = pgTable('comment', {
  id: integer().primaryKey(),
  order_id: integer().references(() => Orders.id),
  user_id: integer().references(() => Users.id),
  comment_text: text(),
  is_complaint: boolean(),
  is_praise: boolean(),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const Driver = pgTable('driver', {
  id: integer().primaryKey(),
  car_make: text(),
  car_model: text(),
  car_year: integer(),
  user_id: integer().references(() => Users.id),
  online: boolean(),
  delivering: boolean(),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const MenuItem = pgTable('menu_item', {
  id: integer().primaryKey(),
  name: text(),
  restaurant_id: integer().references(() => Restaurant.id),
  category_id: integer().references(() => Category.id),
  description: text(),
  ingredients: text(),
  price: decimal(),
  active: boolean(),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const OrderMenuItem = pgTable('order_menu_item', {
  id: integer().primaryKey(),
  order_id: integer().references(() => Orders.id),
  menu_item_id: integer().references(() => MenuItem.id),
  quantity: integer(),
  item_price: decimal(),
  price: decimal(),
  comment: text(),
});

export const OrderStatus = pgTable('order_status', {
  id: integer().primaryKey(),
  order_id: integer().references(() => Orders.id),
  status_catalog_id: integer().references(() => StatusCatalog.id),
  created_at: timestamp(),
});

export const Orders = pgTable('orders', {
  id: integer().primaryKey(),
  restaurant_id: integer().references(() => Restaurant.id),
  estimated_delivery_time: timestamp(),
  actual_delivery_time: timestamp(),
  delivery_address_id: integer().references(() => Address.id),
  user_id: integer().references(() => Users.id),
  driver_id: integer().references(() => Driver.id),
  price: decimal(),
  discount: decimal(),
  final_price: decimal(),
  comment: text(),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const Restaurant = pgTable('restaurant', {
  id: integer().primaryKey(),
  name: text(),
  street_address: text(),
  zip_code: text(),
  city_id: integer().references(() => City.id),
  created_at: timestamp(),
  updated_at: timestamp(),
});

export const State = pgTable('state', {
  id: integer().primaryKey(),
  name: text(),
  code: text(),
});

export const StatusCatalog = pgTable('status_catalog', {
  id: integer().primaryKey(),
  name: text(),
});

export const RestaurantOwner = pgTable('restaurant_owner', {
  id: integer().primaryKey(),
  restaurant_id: integer().references(() => Restaurant.id),
  owner_id: integer().references(() => Users.id),
});
