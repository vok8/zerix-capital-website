import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact submissions schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  message: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Performance data types (for API responses)
export interface PerformanceDataPoint {
  year: string;
  linearEdge: number;
  benchmark: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  sharpe: number;
  maxDrawdown: string;
  inceptionDate: string;
  color: string;
}

// API Response schemas
export const performanceDataPointSchema = z.object({
  year: z.string(),
  linearEdge: z.number(),
  benchmark: z.number(),
});

export const strategySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sharpe: z.number(),
  maxDrawdown: z.string(),
  inceptionDate: z.string(),
  color: z.string(),
});

export const performanceResponseSchema = z.object({
  data: z.array(performanceDataPointSchema),
  source: z.enum(["spanner", "mock"]),
});

export const strategiesResponseSchema = z.object({
  data: z.array(strategySchema),
  source: z.enum(["spanner", "mock"]),
});
