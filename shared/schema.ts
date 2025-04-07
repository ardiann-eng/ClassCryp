import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Core Member schema
export const coreMembers = pgTable("core_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  studentId: text("student_id").notNull(),
  position: text("position").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
});

export const insertCoreMemberSchema = createInsertSchema(coreMembers).pick({
  name: true,
  studentId: true,
  position: true,
  imageUrl: true,
  description: true,
});

export type InsertCoreMember = z.infer<typeof insertCoreMemberSchema>;
export type CoreMember = typeof coreMembers.$inferSelect;

// Class Member schema
export const classMembers = pgTable("class_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  studentId: text("student_id").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertClassMemberSchema = createInsertSchema(classMembers).pick({
  name: true,
  studentId: true,
  imageUrl: true,
});

export type InsertClassMember = z.infer<typeof insertClassMemberSchema>;
export type ClassMember = typeof classMembers.$inferSelect;

// Announcement schema
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  category: text("category").notNull(),
  postedBy: text("posted_by").notNull(),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  title: true,
  content: true,
  date: true,
  category: true,
  postedBy: true,
});

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;

// Schedule schema
export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  day: text("day").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  subject: text("subject").notNull(),
  instructor: text("instructor").notNull(),
  room: text("room").notNull(),
});

export const insertScheduleSchema = createInsertSchema(schedules).pick({
  day: true,
  startTime: true,
  endTime: true,
  subject: true,
  instructor: true,
  room: true,
});

export type InsertSchedule = z.infer<typeof insertScheduleSchema>;
export type Schedule = typeof schedules.$inferSelect;

// Transaction schema
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull().defaultNow(),
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(), // 'income' or 'expense'
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  date: true,
  amount: true,
  description: true,
  category: true,
  type: true,
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
