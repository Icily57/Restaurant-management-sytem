// migrate.ts
import { runMigrations } from 'drizzle-orm/pg-core';
import { db } from './db';
import { Address, Category, City, Comment, Driver, MenuItem, OrderMenuItem, OrderStatus, Orders, Restaurant, State, StatusCatalog, Users, RestaurantOwner } from './schema';

async function migrate() {
  await runMigrations(db, {
    tables: [Address, Category, City, Comment, Driver, MenuItem, OrderMenuItem, OrderStatus, Orders, Restaurant, State, StatusCatalog, Users, RestaurantOwner],
  });
  console.log('Migrations completed');
}

migrate().catch(console.error);
