// index.ts
import { drizzle } from 'drizzle-orm/pg-core';
// import { PgDialect } from 'drizzle-orm/pg-core';
import { Address, Category, City, Comment, Driver, MenuItem, OrderMenuItem, OrderStatus, Orders, Restaurant, State, StatusCatalog, Users, RestaurantOwner } from './schema';
import { PgDialect } from 'drizzle-orm/pg-core';

export const db = drizzle(new PgDialect({
  connectionString: process.env.DATABASE_URL as string,
}));

export async function insertInitialData() {
    const [state] = await db.insert(State).values({
        name: 'Muranga County',
        code: 'MHG'
      }).returning('*');
  
  const [city] = await db.insert(City).values({
    name: 'Muranga Town',
    state_id: state.id
  }).returning('*');

  // Insert a restaurant
  const [restaurant] = await db.insert(Restaurant).values({
    name: 'Nokras Restaurant',
    street_address: '357 Mukuyu Road',
    zip_code: '53775',
    city_id: city.id,
    created_at: new Date(),
    updated_at: new Date()
  }).returning('*');

  // Insert a user
  const [user] = await db.insert(Users).values({
    name: 'Margarita Henrietta',
    contact_phone: '+254-742-068-702',
    phone_verified: true,
    email: 'rita.henri@example.com',
    email_verified: true,
    confirmation_code: 'CONF753',
    password: '39047646@Hgm',
    created_at: new Date(),
    updated_at: new Date()
  }).returning('*');

  // Insert a restaurant owner
  await db.insert(RestaurantOwner).values({
    restaurant_id: restaurant.id,
    owner_id: user.id
  });

  console.log('Initial data inserted');
}

async function main() {
  await insertInitialData();

  const users = await db.select().from(Users).execute();
  console.log(users);
}

main().catch(console.error);
