export interface BusinessProfile {
  name: string;
  industry: string;
  description: string;
  services: string[];
  pricing: string;
  hours: string;
  location: string;
  contact: string;
  policies: string;
}

export enum Sender {
  USER = 'user',
  AI = 'ai'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  intent?: string; // To visualize what the AI thinks the user wants
}

// Structured response from the AI
export interface AIResponseSchema {
  reply: string;
  intent: 'GREETING' | 'INQUIRY' | 'BOOKING_REQUEST' | 'LEAD_COLLECTION' | 'HANDOFF' | 'OTHER';
  confidence: number;
}
