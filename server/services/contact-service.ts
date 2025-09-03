import { type Contact, type InsertContact, type Quote, type InsertQuote } from "@shared/schema";
import { storage } from "../storage";

export class ContactService {
  // Contact management
  async createContact(contactData: InsertContact): Promise<Contact> {
    const contact = await storage.createContact(contactData);
    
    // In a real microservice, this would trigger:
    // - Email notification to admin
    // - Auto-responder email to customer
    // - CRM integration
    // - Slack/Teams notification
    
    await this.notifyNewContact(contact);
    
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return storage.getContacts();
  }

  async getContactById(id: string): Promise<Contact | undefined> {
    return storage.getContact(id);
  }

  async updateContact(id: string, updateData: Partial<InsertContact>): Promise<Contact | undefined> {
    return storage.updateContact(id, updateData);
  }

  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
    return storage.updateContact(id, { status } as any);
  }

  async deleteContact(id: string): Promise<boolean> {
    return storage.deleteContact(id);
  }

  // Quote management
  async createQuote(quoteData: InsertQuote): Promise<Quote> {
    const quote = await storage.createQuote(quoteData);
    
    // In a real microservice, this would trigger:
    // - Quote calculation based on requirements
    // - Email with quote details
    // - Follow-up scheduling
    
    await this.notifyNewQuote(quote);
    
    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return storage.getQuotes();
  }

  async getQuotesByContact(contactId: string): Promise<Quote[]> {
    return storage.getQuotesByContact(contactId);
  }

  async getQuoteById(id: string): Promise<Quote | undefined> {
    return storage.getQuote(id);
  }

  async updateQuote(id: string, updateData: Partial<InsertQuote>): Promise<Quote | undefined> {
    return storage.updateQuote(id, updateData);
  }

  async updateQuoteStatus(id: string, status: string, amount?: number): Promise<Quote | undefined> {
    const updateData: any = { status };
    if (amount !== undefined) {
      updateData.amount = amount;
    }
    return storage.updateQuote(id, updateData);
  }

  async deleteQuote(id: string): Promise<boolean> {
    return storage.deleteQuote(id);
  }

  // Lead scoring and analytics
  async getLeadAnalytics() {
    const [contacts, quotes] = await Promise.all([
      this.getAllContacts(),
      this.getAllQuotes()
    ]);

    const contactsByStatus = contacts.reduce((acc, contact) => {
      const status = contact.status || 'new';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const quotesByStatus = quotes.reduce((acc, quote) => {
      const status = quote.status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const serviceInterest = contacts
      .filter(c => c.service)
      .reduce((acc, contact) => {
        const service = contact.service!;
        acc[service] = (acc[service] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalContacts: contacts.length,
      totalQuotes: quotes.length,
      contactsByStatus,
      quotesByStatus,
      serviceInterest,
      conversionRate: contacts.length > 0 ? (quotes.length / contacts.length * 100).toFixed(2) : '0.00'
    };
  }

  // Service-specific contact filtering
  async getContactsByService(service: string): Promise<Contact[]> {
    const allContacts = await storage.getContacts();
    return allContacts.filter(contact => contact.service === service);
  }

  async getContactsByBudgetRange(budgetRange: string): Promise<Contact[]> {
    const allContacts = await storage.getContacts();
    return allContacts.filter(contact => contact.budget === budgetRange);
  }

  // Private notification methods
  private async notifyNewContact(contact: Contact): Promise<void> {
    // In a real microservice, this would integrate with:
    // - Email service (SendGrid, AWS SES, etc.)
    // - Slack/Teams webhook
    // - CRM API (Salesforce, HubSpot, etc.)
    
    console.log(`New contact received: ${contact.name} (${contact.email}) - Service: ${contact.service}`);
  }

  private async notifyNewQuote(quote: Quote): Promise<void> {
    // In a real microservice, this would:
    // - Send quote email to customer
    // - Notify sales team
    // - Schedule follow-up
    
    console.log(`New quote request: ${quote.service} - Budget: ${quote.budget}`);
  }

  // Health check for this microservice
  healthCheck(): { status: string; service: string; timestamp: string } {
    return {
      status: "healthy",
      service: "contact-service",
      timestamp: new Date().toISOString()
    };
  }
}

export const contactService = new ContactService();