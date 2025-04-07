import { pgTable, text, serial, integer, boolean, date, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Core members schema (class president, secretary, treasurer)
export const coreMembers = pgTable("core_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nim: text("nim").notNull().unique(),
  role: text("role").notNull(), // "president", "secretary", "treasurer"
  imageUrl: text("image_url").notNull(),
});

export const insertCoreMemberSchema = createInsertSchema(coreMembers).pick({
  name: true,
  nim: true,
  role: true,
  imageUrl: true,
});

// Regular class members
export const classMembers = pgTable("class_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nim: text("nim").notNull().unique(),
  imageUrl: text("image_url").notNull(),
});

export const insertClassMemberSchema = createInsertSchema(classMembers).pick({
  name: true,
  nim: true,
  imageUrl: true,
});

// Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().defaultNow(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  postedBy: text("posted_by").notNull(),
  status: text("status").notNull(), // "important", "new", "upcoming", etc.
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  date: true,
  title: true,
  content: true,
  postedBy: true,
  status: true,
});

// Class schedule
export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  day: text("day").notNull(), // "Monday", "Tuesday", etc.
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  subject: text("subject").notNull(),
  location: text("location").notNull(),
  color: text("color").notNull(), // "primary" or "accent"
});

export const insertScheduleSchema = createInsertSchema(schedules).pick({
  day: true,
  startTime: true,
  endTime: true,
  subject: true,
  location: true,
  color: true,
});

// Assignments
export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  dueDate: date("due_date").notNull(),
  assignedDate: date("assigned_date").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "individual", "group", etc.
  submitted: integer("submitted").notNull().default(0),
  total: integer("total").notNull().default(0),
  status: text("status").notNull(), // "upcoming", "completed", etc.
});

export const insertAssignmentSchema = createInsertSchema(assignments).pick({
  title: true,
  dueDate: true,
  assignedDate: true,
  description: true,
  type: true,
  submitted: true,
  total: true,
  status: true,
});

// Transactions for finance
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().defaultNow(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "dues", "supplies", "events", etc.
  amount: numeric("amount").notNull(),
  type: text("type").notNull(), // "income" or "expense"
  status: text("status").notNull(), // "completed", "pending", etc.
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  date: true,
  description: true,
  category: true,
  amount: true,
  type: true,
  status: true,
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  urgent: boolean("urgent").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
  urgent: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CoreMember = typeof coreMembers.$inferSelect;
export type InsertCoreMember = z.infer<typeof insertCoreMemberSchema>;

export type ClassMember = typeof classMembers.$inferSelect;
export type InsertClassMember = z.infer<typeof insertClassMemberSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Schedule = typeof schedules.$inferSelect;
export type InsertSchedule = z.infer<typeof insertScheduleSchema>;

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
