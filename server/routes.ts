import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnnouncementSchema, insertTransactionSchema, insertScheduleSchema } from '@shared/schema';
import { z } from 'zod';

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Core Members
  app.get('/api/core-members', async (req, res) => {
    try {
      const coreMembers = await storage.getCoreMembers();
      res.json(coreMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch core members" });
    }
  });
  
  // Class Members
  app.get('/api/class-members', async (req, res) => {
    try {
      const classMembers = await storage.getClassMembers();
      res.json(classMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class members" });
    }
  });
  
  // Announcements
  app.get('/api/announcements', async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  });
  
  app.post('/api/announcements', async (req, res) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(validatedData);
      res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid announcement data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create announcement" });
      }
    }
  });
  
  // Schedules
  app.get('/api/schedules', async (req, res) => {
    try {
      const schedules = await storage.getSchedules();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedules" });
    }
  });
  
  app.post('/api/schedules', async (req, res) => {
    try {
      const validatedData = insertScheduleSchema.parse(req.body);
      const schedule = await storage.createSchedule(validatedData);
      res.status(201).json(schedule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid schedule data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create schedule" });
      }
    }
  });
  
  // Transactions
  app.get('/api/transactions', async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  
  app.post('/api/transactions', async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create transaction" });
      }
    }
  });
  
  // Transaction Summary
  app.get('/api/transactions/summary', async (req, res) => {
    try {
      const summary = await storage.getTransactionSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transaction summary" });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
