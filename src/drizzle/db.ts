// db.ts
import { drizzle } from 'drizzle-orm/pg-core';
import { PgDialect } from 'drizzle-orm/pg-dialect';
import { Address, Category, City, Comment, Driver, MenuItem, OrderMenuItem, OrderStatus, Orders, Restaurant, State, StatusCatalog, Users, RestaurantOwner } from './schema';

const db = drizzle(new PgDialect({
  connectionString: process.env.DATABASE_URL!,
}));

export { db };
