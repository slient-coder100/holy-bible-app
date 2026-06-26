import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const prayers = mysqlTable("prayers", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  scriptureRef: varchar("scriptureRef", { length: 255 }),
  dayOfWeek: int("dayOfWeek").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Prayer = typeof prayers.$inferSelect;
export type InsertPrayer = typeof prayers.$inferInsert;

export const chatMessages = mysqlTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  userName: varchar("userName", { length: 255 }).notNull(),
  userAvatar: text("userAvatar"),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

export const favoriteVerses = mysqlTable("favorite_verses", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  bookId: varchar("bookId", { length: 10 }).notNull(),
  chapter: int("chapter").notNull(),
  verse: int("verse").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FavoriteVerse = typeof favoriteVerses.$inferSelect;
export type InsertFavoriteVerse = typeof favoriteVerses.$inferInsert;
