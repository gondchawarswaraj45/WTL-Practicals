// ============================================================
// EventCrafts – Shared TypeScript Types
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'vendor' | 'planner' | 'admin';
  phone?: string;
  location?: string;
  joinedDate: string;
}

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  guestCount: number;
  budget: number;
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  description?: string;
  image?: string;
  customerId: string;
  vendorIds?: string[];
  plannerId?: string;
  progress?: number;
}

export type EventType =
  | 'Wedding'
  | 'Corporate Conference'
  | 'Birthday Party'
  | 'Graduation'
  | 'Baby Shower'
  | 'Anniversary'
  | 'Charity Gala'
  | 'Product Launch'
  | 'Music Festival'
  | 'Workshop';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: string;
  description: string;
  image: string;
  verified: boolean;
  services: string[];
  availability: boolean;
  yearsOfExperience: number;
  completedEvents: number;
}

export type VendorCategory =
  | 'Venue'
  | 'Catering'
  | 'Photography'
  | 'Decoration'
  | 'DJ & Sound'
  | 'Lighting'
  | 'Transportation'
  | 'Florist'
  | 'Cake & Bakery'
  | 'Entertainment'
  | 'Makeup & Styling'
  | 'Videography';

export interface EventPlanner {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: string;
  description: string;
  image: string;
  verified: boolean;
  specializations: EventType[];
  yearsOfExperience: number;
  eventsPlanned: number;
  successRate: number;
}

export interface Booking {
  id: string;
  eventId: string;
  vendorId?: string;
  plannerId?: string;
  customerId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  amount: number;
  service: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  targetId: string;
  rating: number;
  comment: string;
  date: string;
  eventType: EventType;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  participants: { id: string; name: string; avatar: string; role: string }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  type: 'payment' | 'earning' | 'refund';
  eventName?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  rsvpStatus: 'invited' | 'accepted' | 'declined' | 'pending';
  mealPreference?: string;
  plusOne: boolean;
  tableNumber?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  eventId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: VendorCategory;
  image?: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  services: string[];
  popular: boolean;
  tier: 'basic' | 'standard' | 'premium';
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  eventType: EventType;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down';
  icon: string;
}

export interface SidebarItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: SidebarItem[];
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  category: string;
}

export interface InvitationTemplate {
  id: string;
  name: string;
  category: EventType;
  image: string;
  popular: boolean;
}
