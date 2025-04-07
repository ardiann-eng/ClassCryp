import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCoreMemberSchema,
  insertClassMemberSchema,
  insertAnnouncementSchema,
  insertScheduleSchema,
  insertAssignmentSchema,
  insertTransactionSchema,
  insertContactMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Core Members Routes
  app.get("/api/core-members", async (req, res) => {
    try {
      const coreMembers = await storage.getAllCoreMembers();
      res.json(coreMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch core members" });
    }
  });

  app.get("/api/core-members/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const coreMember = await storage.getCoreMember(id);
      
      if (!coreMember) {
        return res.status(404).json({ message: "Core member not found" });
      }
      
      res.json(coreMember);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch core member" });
    }
  });

  app.post("/api/core-members", async (req, res) => {
    try {
      const data = insertCoreMemberSchema.parse(req.body);
      const newCoreMember = await storage.createCoreMember(data);
      res.status(201).json(newCoreMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create core member" });
    }
  });

  app.put("/api/core-members/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = insertCoreMemberSchema.partial().parse(req.body);
      const updatedCoreMember = await storage.updateCoreMember(id, data);
      
      if (!updatedCoreMember) {
        return res.status(404).json({ message: "Core member not found" });
      }
      
      res.json(updatedCoreMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update core member" });
    }
  });

  app.delete("/api/core-members/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteCoreMember(id);
      
      if (!success) {
        return res.status(404).json({ message: "Core member not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete core member" });
    }
  });

  // Class Members Routes
  app.get("/api/class-members", async (req, res) => {
    try {
      const classMembers = await storage.getAllClassMembers();
      res.json(classMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class members" });
    }
  });

  app.get("/api/class-members/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const classMember = await storage.getClassMember(id);
      
      if (!classMember) {
        return res.status(404).json({ message: "Class member not found" });
      }
      
      res.json(classMember);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class member" });
    }
  });

  app.post("/api/class-members", async (req, res) => {
    try {
      const data = insertClassMemberSchema.parse(req.body);
      const newClassMember = await storage.createClassMember(data);
      res.status(201).json(newClassMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create class member" });
    }
  });

  app.put("/api/class-members/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = insertClassMemberSchema.partial().parse(req.body);
      const updatedClassMember = await storage.updateClassMember(id, data);
      
      if (!updatedClassMember) {
        return res.status(404).json({ message: "Class member not found" });
      }
      
      res.json(updatedClassMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update class member" });
    }
  });

  app.delete("/api/class-members/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteClassMember(id);
      
      if (!success) {
        return res.status(404).json({ message: "Class member not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete class member" });
    }
  });

  // Announcements Routes
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAllAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  });

  app.get("/api/announcements/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const announcement = await storage.getAnnouncement(id);
      
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      
      res.json(announcement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch announcement" });
    }
  });

  app.post("/api/announcements", async (req, res) => {
    try {
      const data = insertAnnouncementSchema.parse(req.body);
      const newAnnouncement = await storage.createAnnouncement(data);
      res.status(201).json(newAnnouncement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create announcement" });
    }
  });

  app.put("/api/announcements/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = insertAnnouncementSchema.partial().parse(req.body);
      const updatedAnnouncement = await storage.updateAnnouncement(id, data);
      
      if (!updatedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      
      res.json(updatedAnnouncement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update announcement" });
    }
  });

  app.delete("/api/announcements/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteAnnouncement(id);
      
      if (!success) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete announcement" });
    }
  });

  // Schedules Routes
  app.get("/api/schedules", async (req, res) => {
    try {
      const schedules = await storage.getAllSchedules();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedules" });
    }
  });

  app.get("/api/schedules/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const schedule = await storage.getSchedule(id);
      
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedule" });
    }
  });

  app.post("/api/schedules", async (req, res) => {
    try {
      const data = insertScheduleSchema.parse(req.body);
      const newSchedule = await storage.createSchedule(data);
      res.status(201).json(newSchedule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create schedule" });
    }
  });

  app.put("/api/schedules/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = insertScheduleSchema.partial().parse(req.body);
      const updatedSchedule = await storage.updateSchedule(id, data);
      
      if (!updatedSchedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      
      res.json(updatedSchedule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update schedule" });
    }
  });

  app.delete("/api/schedules/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteSchedule(id);
      
      if (!success) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete schedule" });
    }
  });

  // Assignments Routes
  app.get("/api/assignments", async (req, res) => {
    try {
      const assignments = await storage.getAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });

  app.get("/api/assignments/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const assignment = await storage.getAssignment(id);
      
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assignment" });
    }
  });

  app.post("/api/assignments", async (req, res) => {
    try {
      const data = insertAssignmentSchema.parse(req.body);
      const newAssignment = await storage.createAssignment(data);
      res.status(201).json(newAssignment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  app.put("/api/assignments/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = insertAssignmentSchema.partial().parse(req.body);
      const updatedAssignment = await storage.updateAssignment(id, data);
      
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.json(updatedAssignment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update assignment" });
    }
  });

  app.delete("/api/assignments/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteAssignment(id);
      
      if (!success) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete assignment" });
    }
  });

  // Transactions Routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.get("/api/transactions/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const transaction = await storage.getTransaction(id);
      
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transaction" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const data = insertTransactionSchema.parse(req.body);
      const newTransaction = await storage.createTransaction(data);
      res.status(201).json(newTransaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });

  app.put("/api/transactions/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = insertTransactionSchema.partial().parse(req.body);
      const updatedTransaction = await storage.updateTransaction(id, data);
      
      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.json(updatedTransaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update transaction" });
    }
  });

  app.delete("/api/transactions/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteTransaction(id);
      
      if (!success) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete transaction" });
    }
  });

  app.get("/api/finance-summary", async (req, res) => {
    try {
      const summary = await storage.getFinanceSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch finance summary" });
    }
  });

  // Contact Messages Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(data);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
