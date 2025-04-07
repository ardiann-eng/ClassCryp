import {
  users, type User, type InsertUser,
  coreMembers, type CoreMember, type InsertCoreMember,
  classMembers, type ClassMember, type InsertClassMember,
  announcements, type Announcement, type InsertAnnouncement,
  schedules, type Schedule, type InsertSchedule,
  assignments, type Assignment, type InsertAssignment,
  transactions, type Transaction, type InsertTransaction,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Core members
  getAllCoreMembers(): Promise<CoreMember[]>;
  getCoreMember(id: number): Promise<CoreMember | undefined>;
  createCoreMember(member: InsertCoreMember): Promise<CoreMember>;
  updateCoreMember(id: number, member: Partial<InsertCoreMember>): Promise<CoreMember | undefined>;
  deleteCoreMember(id: number): Promise<boolean>;
  
  // Class members
  getAllClassMembers(): Promise<ClassMember[]>;
  getClassMember(id: number): Promise<ClassMember | undefined>;
  createClassMember(member: InsertClassMember): Promise<ClassMember>;
  updateClassMember(id: number, member: Partial<InsertClassMember>): Promise<ClassMember | undefined>;
  deleteClassMember(id: number): Promise<boolean>;
  
  // Announcements
  getAllAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;
  
  // Schedules
  getAllSchedules(): Promise<Schedule[]>;
  getSchedule(id: number): Promise<Schedule | undefined>;
  createSchedule(schedule: InsertSchedule): Promise<Schedule>;
  updateSchedule(id: number, schedule: Partial<InsertSchedule>): Promise<Schedule | undefined>;
  deleteSchedule(id: number): Promise<boolean>;
  
  // Assignments
  getAllAssignments(): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  updateAssignment(id: number, assignment: Partial<InsertAssignment>): Promise<Assignment | undefined>;
  deleteAssignment(id: number): Promise<boolean>;
  
  // Transactions
  getAllTransactions(): Promise<Transaction[]>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;
  deleteTransaction(id: number): Promise<boolean>;
  getFinanceSummary(): Promise<{ totalBalance: number, totalIncome: number, totalExpenses: number, duesCollected: number }>;
  
  // Contact messages
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private coreMembers: Map<number, CoreMember>;
  private classMembers: Map<number, ClassMember>;
  private announcements: Map<number, Announcement>;
  private schedules: Map<number, Schedule>;
  private assignments: Map<number, Assignment>;
  private transactions: Map<number, Transaction>;
  private contactMessages: Map<number, ContactMessage>;
  
  private currentUserId: number;
  private currentCoreMemberId: number;
  private currentClassMemberId: number;
  private currentAnnouncementId: number;
  private currentScheduleId: number;
  private currentAssignmentId: number;
  private currentTransactionId: number;
  private currentContactMessageId: number;
  
  constructor() {
    this.users = new Map();
    this.coreMembers = new Map();
    this.classMembers = new Map();
    this.announcements = new Map();
    this.schedules = new Map();
    this.assignments = new Map();
    this.transactions = new Map();
    this.contactMessages = new Map();
    
    this.currentUserId = 1;
    this.currentCoreMemberId = 1;
    this.currentClassMemberId = 1;
    this.currentAnnouncementId = 1;
    this.currentScheduleId = 1;
    this.currentAssignmentId = 1;
    this.currentTransactionId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Add default core members
    this.createCoreMember({
      name: "Anaya Wijaya",
      nim: "19210720",
      role: "president",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=350"
    });
    
    this.createCoreMember({
      name: "Budi Santoso",
      nim: "19210721",
      role: "secretary",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=350"
    });
    
    this.createCoreMember({
      name: "Cindy Permata",
      nim: "19210722",
      role: "treasurer",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&h=350"
    });
    
    // Add some class members
    const memberImages = [
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=160",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=160"
    ];
    
    const memberNames = [
      "Dewi Anggraini", "Eko Prasetyo", "Fani Sulistiawati", "Gunawan Wibisono",
      "Hani Puspita", "Irfan Malik", "Jasmine Putri", "Kevin Anggara"
    ];
    
    memberNames.forEach((name, i) => {
      this.createClassMember({
        name,
        nim: (19210723 + i).toString(),
        imageUrl: memberImages[i % memberImages.length]
      });
    });
    
    // Add more class members to reach total of 38
    for (let i = 0; i < 30; i++) {
      const gender = i % 2 === 0 ? "men" : "women";
      const randomNum = Math.floor(Math.random() * 100);
      
      this.createClassMember({
        name: `Student ${this.currentClassMemberId}`,
        nim: (19210731 + i).toString(),
        imageUrl: `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`
      });
    }
    
    // Add some announcements
    this.createAnnouncement({
      date: new Date("2023-10-15"),
      title: "Mid-term Exam Schedule",
      content: "The mid-term exams will be held from October 25 to October 30. Please check the schedule below and prepare accordingly.",
      postedBy: "Anaya Wijaya",
      status: "important"
    });
    
    this.createAnnouncement({
      date: new Date("2023-10-10"),
      title: "Group Project Assignment",
      content: "Group project assignments for this semester have been posted. Please form groups of 4-5 students and submit your proposal by October 20.",
      postedBy: "Budi Santoso",
      status: "new"
    });
    
    this.createAnnouncement({
      date: new Date("2023-10-05"),
      title: "Rescheduled Class for Next Week",
      content: "The cryptography class on Monday has been rescheduled to Wednesday at the same time due to a faculty meeting.",
      postedBy: "Anaya Wijaya",
      status: "upcoming"
    });
    
    // Add schedules
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const subjects = [
      "Cryptography Basics", "Database Systems", "System Security", 
      "Networking Fundamentals", "Advanced Algorithms", "Web Security",
      "Project Workshop"
    ];
    
    const locations = ["Room 301", "Lab 102", "Lab 104", "Room 302", "Room 305", "Lab 101", "Lab 103"];
    
    const timeSlots = [
      { start: "08:00", end: "10:00" },
      { start: "10:15", end: "12:15" },
      { start: "13:00", end: "15:00" }
    ];
    
    // Create a simple weekly schedule
    this.createSchedule({
      day: "Monday",
      startTime: "08:00",
      endTime: "10:00",
      subject: "Cryptography Basics",
      location: "Room 301",
      color: "primary"
    });
    
    this.createSchedule({
      day: "Wednesday",
      startTime: "08:00",
      endTime: "10:00",
      subject: "System Security",
      location: "Lab 102",
      color: "accent"
    });
    
    this.createSchedule({
      day: "Friday",
      startTime: "08:00",
      endTime: "10:00",
      subject: "Advanced Algorithms",
      location: "Room 305",
      color: "primary"
    });
    
    this.createSchedule({
      day: "Tuesday",
      startTime: "10:15",
      endTime: "12:15",
      subject: "Database Systems",
      location: "Lab 104",
      color: "accent"
    });
    
    this.createSchedule({
      day: "Thursday",
      startTime: "10:15",
      endTime: "12:15",
      subject: "Networking Fundamentals",
      location: "Room 302",
      color: "primary"
    });
    
    this.createSchedule({
      day: "Monday",
      startTime: "13:00",
      endTime: "15:00",
      subject: "Web Security",
      location: "Lab 101",
      color: "accent"
    });
    
    this.createSchedule({
      day: "Wednesday",
      startTime: "13:00",
      endTime: "15:00",
      subject: "Project Workshop",
      location: "Lab 103",
      color: "accent"
    });
    
    // Add assignments
    this.createAssignment({
      title: "Cryptography Implementation",
      dueDate: new Date("2023-10-25"),
      assignedDate: new Date("2023-10-10"),
      description: "Implement a basic encryption algorithm using the principles discussed in class.",
      type: "group",
      submitted: 12,
      total: 38,
      status: "upcoming"
    });
    
    this.createAssignment({
      title: "Security Analysis Report",
      dueDate: new Date("2023-10-18"),
      assignedDate: new Date("2023-10-01"),
      description: "Analyze a case study of a recent security breach and write a detailed report.",
      type: "individual",
      submitted: 25,
      total: 38,
      status: "upcoming"
    });
    
    this.createAssignment({
      title: "Network Security Quiz",
      dueDate: new Date("2023-09-30"),
      assignedDate: new Date("2023-09-25"),
      description: "Online quiz covering topics from chapters 3-5 of the textbook.",
      type: "individual",
      submitted: 38,
      total: 38,
      status: "completed"
    });
    
    // Add transactions
    this.createTransaction({
      date: new Date("2023-10-12"),
      description: "Monthly Class Dues",
      category: "dues",
      amount: 1900000,
      type: "income",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-10-05"),
      description: "Class Event Supplies",
      category: "supplies",
      amount: 750000,
      type: "expense",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-09-28"),
      description: "Study Materials Printing",
      category: "materials",
      amount: 450000,
      type: "expense",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-09-20"),
      description: "Fundraising Event",
      category: "fundraising",
      amount: 2500000,
      type: "income",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-09-15"),
      description: "Monthly Class Dues",
      category: "dues",
      amount: 1900000,
      type: "income",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-09-10"),
      description: "Field Trip Transportation",
      category: "transportation",
      amount: 1200000,
      type: "expense",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-09-05"),
      description: "Welcome Party Decorations",
      category: "events",
      amount: 350000,
      type: "expense",
      status: "completed"
    });
    
    this.createTransaction({
      date: new Date("2023-08-28"),
      description: "Monthly Class Dues",
      category: "dues",
      amount: 1300000,
      type: "income",
      status: "completed"
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // CoreMember methods
  async getAllCoreMembers(): Promise<CoreMember[]> {
    return Array.from(this.coreMembers.values());
  }
  
  async getCoreMember(id: number): Promise<CoreMember | undefined> {
    return this.coreMembers.get(id);
  }
  
  async createCoreMember(member: InsertCoreMember): Promise<CoreMember> {
    const id = this.currentCoreMemberId++;
    const coreMember: CoreMember = { ...member, id };
    this.coreMembers.set(id, coreMember);
    return coreMember;
  }
  
  async updateCoreMember(id: number, member: Partial<InsertCoreMember>): Promise<CoreMember | undefined> {
    const existing = this.coreMembers.get(id);
    if (!existing) return undefined;
    
    const updated: CoreMember = { ...existing, ...member };
    this.coreMembers.set(id, updated);
    return updated;
  }
  
  async deleteCoreMember(id: number): Promise<boolean> {
    return this.coreMembers.delete(id);
  }
  
  // ClassMember methods
  async getAllClassMembers(): Promise<ClassMember[]> {
    return Array.from(this.classMembers.values());
  }
  
  async getClassMember(id: number): Promise<ClassMember | undefined> {
    return this.classMembers.get(id);
  }
  
  async createClassMember(member: InsertClassMember): Promise<ClassMember> {
    const id = this.currentClassMemberId++;
    const classMember: ClassMember = { ...member, id };
    this.classMembers.set(id, classMember);
    return classMember;
  }
  
  async updateClassMember(id: number, member: Partial<InsertClassMember>): Promise<ClassMember | undefined> {
    const existing = this.classMembers.get(id);
    if (!existing) return undefined;
    
    const updated: ClassMember = { ...existing, ...member };
    this.classMembers.set(id, updated);
    return updated;
  }
  
  async deleteClassMember(id: number): Promise<boolean> {
    return this.classMembers.delete(id);
  }
  
  // Announcement methods
  async getAllAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values());
  }
  
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }
  
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    const newAnnouncement: Announcement = { ...announcement, id };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }
  
  async updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const existing = this.announcements.get(id);
    if (!existing) return undefined;
    
    const updated: Announcement = { ...existing, ...announcement };
    this.announcements.set(id, updated);
    return updated;
  }
  
  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcements.delete(id);
  }
  
  // Schedule methods
  async getAllSchedules(): Promise<Schedule[]> {
    return Array.from(this.schedules.values());
  }
  
  async getSchedule(id: number): Promise<Schedule | undefined> {
    return this.schedules.get(id);
  }
  
  async createSchedule(schedule: InsertSchedule): Promise<Schedule> {
    const id = this.currentScheduleId++;
    const newSchedule: Schedule = { ...schedule, id };
    this.schedules.set(id, newSchedule);
    return newSchedule;
  }
  
  async updateSchedule(id: number, schedule: Partial<InsertSchedule>): Promise<Schedule | undefined> {
    const existing = this.schedules.get(id);
    if (!existing) return undefined;
    
    const updated: Schedule = { ...existing, ...schedule };
    this.schedules.set(id, updated);
    return updated;
  }
  
  async deleteSchedule(id: number): Promise<boolean> {
    return this.schedules.delete(id);
  }
  
  // Assignment methods
  async getAllAssignments(): Promise<Assignment[]> {
    return Array.from(this.assignments.values());
  }
  
  async getAssignment(id: number): Promise<Assignment | undefined> {
    return this.assignments.get(id);
  }
  
  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const id = this.currentAssignmentId++;
    const newAssignment: Assignment = { ...assignment, id };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }
  
  async updateAssignment(id: number, assignment: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const existing = this.assignments.get(id);
    if (!existing) return undefined;
    
    const updated: Assignment = { ...existing, ...assignment };
    this.assignments.set(id, updated);
    return updated;
  }
  
  async deleteAssignment(id: number): Promise<boolean> {
    return this.assignments.delete(id);
  }
  
  // Transaction methods
  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }
  
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const newTransaction: Transaction = { ...transaction, id };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }
  
  async updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const existing = this.transactions.get(id);
    if (!existing) return undefined;
    
    const updated: Transaction = { ...existing, ...transaction };
    this.transactions.set(id, updated);
    return updated;
  }
  
  async deleteTransaction(id: number): Promise<boolean> {
    return this.transactions.delete(id);
  }
  
  async getFinanceSummary(): Promise<{ totalBalance: number, totalIncome: number, totalExpenses: number, duesCollected: number }> {
    const allTransactions = await this.getAllTransactions();
    
    const totalIncome = allTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const totalExpenses = allTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const totalBalance = totalIncome - totalExpenses;
    
    // Calculate dues collected (Just using a mock value here)
    const duesCollected = 34;
    
    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      duesCollected
    };
  }
  
  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    return this.contactMessages.delete(id);
  }
}

export const storage = new MemStorage();
