import {
  users, type User, type InsertUser,
  coreMembers, type CoreMember, type InsertCoreMember,
  classMembers, type ClassMember, type InsertClassMember,
  announcements, type Announcement, type InsertAnnouncement,
  schedules, type Schedule, type InsertSchedule,
  transactions, type Transaction, type InsertTransaction
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Core Member operations
  getCoreMembers(): Promise<CoreMember[]>;
  getCoreMember(id: number): Promise<CoreMember | undefined>;
  createCoreMember(member: InsertCoreMember): Promise<CoreMember>;
  
  // Class Member operations
  getClassMembers(): Promise<ClassMember[]>;
  getClassMember(id: number): Promise<ClassMember | undefined>;
  createClassMember(member: InsertClassMember): Promise<ClassMember>;
  
  // Announcement operations
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  
  // Schedule operations
  getSchedules(): Promise<Schedule[]>;
  getSchedule(id: number): Promise<Schedule | undefined>;
  createSchedule(schedule: InsertSchedule): Promise<Schedule>;
  
  // Transaction operations
  getTransactions(): Promise<Transaction[]>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionSummary(): Promise<{
    currentBalance: number;
    totalIncome: number;
    totalExpense: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private coreMembers: Map<number, CoreMember>;
  private classMembers: Map<number, ClassMember>;
  private announcements: Map<number, Announcement>;
  private schedules: Map<number, Schedule>;
  private transactions: Map<number, Transaction>;
  
  private currentId: { 
    users: number;
    coreMembers: number;
    classMembers: number;
    announcements: number;
    schedules: number;
    transactions: number;
  };

  constructor() {
    this.users = new Map();
    this.coreMembers = new Map();
    this.classMembers = new Map();
    this.announcements = new Map();
    this.schedules = new Map();
    this.transactions = new Map();
    
    this.currentId = {
      users: 1,
      coreMembers: 1,
      classMembers: 1,
      announcements: 1,
      schedules: 1,
      transactions: 1,
    };
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Core Member operations
  async getCoreMembers(): Promise<CoreMember[]> {
    return Array.from(this.coreMembers.values());
  }
  
  async getCoreMember(id: number): Promise<CoreMember | undefined> {
    return this.coreMembers.get(id);
  }
  
  async createCoreMember(member: InsertCoreMember): Promise<CoreMember> {
    const id = this.currentId.coreMembers++;
    const coreMember: CoreMember = { ...member, id };
    this.coreMembers.set(id, coreMember);
    return coreMember;
  }
  
  // Class Member operations
  async getClassMembers(): Promise<ClassMember[]> {
    return Array.from(this.classMembers.values());
  }
  
  async getClassMember(id: number): Promise<ClassMember | undefined> {
    return this.classMembers.get(id);
  }
  
  async createClassMember(member: InsertClassMember): Promise<ClassMember> {
    const id = this.currentId.classMembers++;
    const classMember: ClassMember = { ...member, id };
    this.classMembers.set(id, classMember);
    return classMember;
  }
  
  // Announcement operations
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }
  
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentId.announcements++;
    const newAnnouncement: Announcement = { ...announcement, id };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }
  
  // Schedule operations
  async getSchedules(): Promise<Schedule[]> {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return Array.from(this.schedules.values()).sort((a, b) => 
      dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
  }
  
  async getSchedule(id: number): Promise<Schedule | undefined> {
    return this.schedules.get(id);
  }
  
  async createSchedule(schedule: InsertSchedule): Promise<Schedule> {
    const id = this.currentId.schedules++;
    const newSchedule: Schedule = { ...schedule, id };
    this.schedules.set(id, newSchedule);
    return newSchedule;
  }
  
  // Transaction operations
  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentId.transactions++;
    const newTransaction: Transaction = { ...transaction, id };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }
  
  async getTransactionSummary(): Promise<{
    currentBalance: number;
    totalIncome: number;
    totalExpense: number;
  }> {
    let totalIncome = 0;
    let totalExpense = 0;
    
    Array.from(this.transactions.values()).forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    
    return {
      currentBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense
    };
  }
  
  // Initialize with sample data for the app
  private initializeData() {
    // Core Members
    const coreMembers: InsertCoreMember[] = [
      {
        name: "Ahmad Rizky",
        studentId: "2023050001",
        position: "Class President",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Leads class initiatives and represents students to faculty."
      },
      {
        name: "Siti Nurhaliza",
        studentId: "2023050002",
        position: "Secretary",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Manages class documentation, schedules, and correspondence."
      },
      {
        name: "Budi Santoso",
        studentId: "2023050003",
        position: "Treasurer",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Handles class finances, including collections and expenditures."
      }
    ];
    
    coreMembers.forEach(member => {
      const id = this.currentId.coreMembers++;
      this.coreMembers.set(id, { ...member, id });
    });
    
    // Class Members
    const classMembers: InsertClassMember[] = [
      { name: "Dewi Anggraini", studentId: "2023050004", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Rudi Hartono", studentId: "2023050005", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Indah Permata", studentId: "2023050006", imageUrl: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Hendra Wijaya", studentId: "2023050007", imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Rina Susanti", studentId: "2023050008", imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Agus Salim", studentId: "2023050009", imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Nadia Putri", studentId: "2023050010", imageUrl: "https://images.unsplash.com/photo-1557555187-23d685287bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Maya Sari", studentId: "2023050011", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Dian Pratiwi", studentId: "2023050012", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Irfan Hakim", studentId: "2023050013", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Anita Wijaya", studentId: "2023050014", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Faisal Rahman", studentId: "2023050015", imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Yuni Astuti", studentId: "2023050016", imageUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Didi Pratama", studentId: "2023050017", imageUrl: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Sari Indah", studentId: "2023050018", imageUrl: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Bayu Wicaksono", studentId: "2023050019", imageUrl: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Lina Kartika", studentId: "2023050020", imageUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Rahmat Hidayat", studentId: "2023050021", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Dewi Lestari", studentId: "2023050022", imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Eko Prasetyo", studentId: "2023050023", imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Nina Safira", studentId: "2023050024", imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Joko Sutrisno", studentId: "2023050025", imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Dina Maulida", studentId: "2023050026", imageUrl: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Rizal Effendy", studentId: "2023050027", imageUrl: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Ratna Sari", studentId: "2023050028", imageUrl: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Arif Wibowo", studentId: "2023050029", imageUrl: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Sinta Dewi", studentId: "2023050030", imageUrl: "https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Wahyu Cahyono", studentId: "2023050031", imageUrl: "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Lia Amalia", studentId: "2023050032", imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Reza Firmansyah", studentId: "2023050033", imageUrl: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Putri Rahayu", studentId: "2023050034", imageUrl: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Danu Kusuma", studentId: "2023050035", imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Eva Permatasari", studentId: "2023050036", imageUrl: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Taufik Hidayat", studentId: "2023050037", imageUrl: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" },
      { name: "Anggi Puspita", studentId: "2023050038", imageUrl: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" }
    ];
    
    classMembers.forEach(member => {
      const id = this.currentId.classMembers++;
      this.classMembers.set(id, { ...member, id });
    });
    
    // Announcements
    const announcements: InsertAnnouncement[] = [
      {
        title: "Final Project Submission",
        content: "Submit your cryptography project through the online portal by midnight.",
        date: new Date("2023-06-15"),
        category: "Urgent",
        postedBy: "Dr. Hadi"
      },
      {
        title: "Guest Lecture: Blockchain Security",
        content: "Special lecture by industry expert on blockchain security fundamentals.",
        date: new Date("2023-06-10"),
        category: "Event",
        postedBy: "Secretary"
      },
      {
        title: "Mid-term Review Session",
        content: "Group study session to review cryptographic algorithms before the exam.",
        date: new Date("2023-06-05"),
        category: "Class Activity",
        postedBy: "Class President"
      },
      {
        title: "Monthly Dues Reminder",
        content: "Please submit your monthly class dues by Friday.",
        date: new Date("2023-06-01"),
        category: "Finance",
        postedBy: "Treasurer"
      },
      {
        title: "Cryptography Competition",
        content: "Registration for the national cryptography competition is now open.",
        date: new Date("2023-05-30"),
        category: "Event",
        postedBy: "Secretary"
      },
      {
        title: "Class Meeting Minutes",
        content: "The minutes from our last class meeting are now available in the shared drive.",
        date: new Date("2023-05-25"),
        category: "Information",
        postedBy: "Secretary"
      }
    ];
    
    announcements.forEach(announcement => {
      const id = this.currentId.announcements++;
      this.announcements.set(id, { ...announcement, id });
    });
    
    // Schedules
    const schedules: InsertSchedule[] = [
      {
        day: "Monday",
        startTime: "09:00",
        endTime: "11:30",
        subject: "Cryptography Fundamentals",
        instructor: "Dr. Hadi Wijaya",
        room: "Room 201"
      },
      {
        day: "Tuesday",
        startTime: "13:00",
        endTime: "15:30",
        subject: "Data Structures & Algorithms",
        instructor: "Prof. Dewi Sartika",
        room: "Lab 102"
      },
      {
        day: "Wednesday",
        startTime: "10:00",
        endTime: "12:30",
        subject: "Network Security",
        instructor: "Dr. Rudi Hartono",
        room: "Room 305"
      },
      {
        day: "Thursday",
        startTime: "15:00",
        endTime: "17:30",
        subject: "Blockchain Technology",
        instructor: "Prof. Ahmad Sulaiman",
        room: "Lab 104"
      },
      {
        day: "Friday",
        startTime: "08:00",
        endTime: "10:30",
        subject: "Applied Cryptography",
        instructor: "Dr. Hadi Wijaya",
        room: "Room 201"
      }
    ];
    
    schedules.forEach(schedule => {
      const id = this.currentId.schedules++;
      this.schedules.set(id, { ...schedule, id });
    });
    
    // Transactions
    const transactions: InsertTransaction[] = [
      {
        date: new Date("2023-06-02"),
        amount: 1900000,
        description: "Monthly Class Dues Collection",
        category: "Monthly Dues",
        type: "income"
      },
      {
        date: new Date("2023-05-28"),
        amount: 325000,
        description: "Study Group Workshop Materials",
        category: "Study Materials",
        type: "expense"
      },
      {
        date: new Date("2023-05-20"),
        amount: 450000,
        description: "Cryptography Competition Registration",
        category: "Events & Activities",
        type: "expense"
      },
      {
        date: new Date("2023-05-15"),
        amount: 1000000,
        description: "Faculty Donation for Class Project",
        category: "Donation",
        type: "income"
      },
      {
        date: new Date("2023-05-10"),
        amount: 190000,
        description: "Office Supplies for Class Admin",
        category: "Office Supplies",
        type: "expense"
      },
      {
        date: new Date("2023-05-05"),
        amount: 1200000,
        description: "Previous Month Class Dues",
        category: "Monthly Dues",
        type: "income"
      },
      {
        date: new Date("2023-05-02"),
        amount: 300000,
        description: "Study Tour Transportation",
        category: "Events & Activities",
        type: "expense"
      },
      {
        date: new Date("2023-04-25"),
        amount: 725000,
        description: "Event Fundraising",
        category: "Fundraising",
        type: "income"
      }
    ];
    
    transactions.forEach(transaction => {
      const id = this.currentId.transactions++;
      this.transactions.set(id, { ...transaction, id });
    });
  }
}

export const storage = new MemStorage();
