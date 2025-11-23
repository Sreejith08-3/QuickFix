// Core type definitions for QuickFix platform

export type UserRole = 'customer' | 'technician' | 'admin';

export type ServiceCategory = 
  | 'electrical'
  | 'plumbing'
  | 'carpentry'
  | 'painting'
  | 'hvac'
  | 'appliance'
  | 'locksmith'
  | 'cleaning'
  | 'other';

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type TechnicianBadge = 
  | 'super_technician'
  | 'fast_responder'
  | 'highly_rated'
  | 'expert_specialist';

export type Language = 'en' | 'ml' | 'hi' | 'ta' | 'te' | 'kn';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  createdAt: Date;
}

export interface Technician extends User {
  role: 'technician';
  skills: ServiceCategory[];
  rating: number;
  totalJobs: number;
  badges: TechnicianBadge[];
  verified: boolean;
  availability: boolean;
  hourlyRate: number;
  bio: string;
  certifications?: string[];
  experience: number; // years
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  icon: string;
  averagePrice: number;
  estimatedDuration: string;
}

export interface Booking {
  id: string;
  userId: string;
  technicianId: string;
  serviceCategory: ServiceCategory;
  description: string;
  status: BookingStatus;
  scheduledDate: Date;
  location: string;
  estimatedCost: number;
  actualCost?: number;
  photos?: string[];
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIDiagnostic {
  id: string;
  userId: string;
  images: string[];
  videos?: string[];
  predictedIssue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost: number;
  requiredCategory: ServiceCategory;
  confidence: number;
  recommendations: string[];
  createdAt: Date;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  content: string;
  images?: string[];
  category: ServiceCategory;
  upvotes: number;
  comments: ForumComment[];
  createdAt: Date;
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  upvotes: number;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  bookingId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'review' | 'payment' | 'emergency';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  technicianId: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: Date;
}
