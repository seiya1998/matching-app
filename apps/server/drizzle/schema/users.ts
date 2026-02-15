import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

// サンプルテーブル（将来：Prismaから移行）
export const users = mysqlTable('users', {
  id: varchar('id', { length: 25 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull()
});
