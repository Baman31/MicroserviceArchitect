import { type User, type InsertUser } from "@shared/schema";
import { storage } from "../storage";

export class UserService {
  async createUser(userData: InsertUser): Promise<User> {
    return storage.createUser(userData);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return storage.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return storage.getUserByUsername(username);
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await storage.getUserByUsername(username);
    
    // In a real microservice, this would use proper password hashing
    if (user && user.password === password) {
      return user;
    }
    
    return null;
  }

  // Health check for this microservice
  healthCheck(): { status: string; service: string; timestamp: string } {
    return {
      status: "healthy",
      service: "user-service",
      timestamp: new Date().toISOString()
    };
  }
}

export const userService = new UserService();