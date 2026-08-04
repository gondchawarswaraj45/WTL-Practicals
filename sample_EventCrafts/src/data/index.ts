// ============================================================
// EventCrafts – Realistic Dummy Data
// ============================================================
import type {
  Vendor, EventPlanner, Event, Booking, Review, Notification,
  ChatConversation, Transaction, Guest, Task, FAQ, Testimonial,
  Service, Package, Complaint, InvitationTemplate,
} from '@/types';

// ── Vendors ──────────────────────────────────────────────────
export const vendors: Vendor[] = [
  {
    id: 'v1', name: 'Royal Grand Palace', category: 'Venue', rating: 4.9, reviewCount: 324,
    priceRange: '₹2,00,000 – ₹8,00,000', location: 'Mumbai, Maharashtra',
    description: 'A majestic 5-star banquet venue with panoramic city views, indoor & outdoor spaces, and world-class amenities for up to 2,000 guests.',
    image: '', verified: true, services: ['Indoor Hall', 'Garden Area', 'Terrace', 'Parking', 'Valet'],
    availability: true, yearsOfExperience: 15, completedEvents: 1200,
  },
  {
    id: 'v2', name: 'Gourmet Delights Catering', category: 'Catering', rating: 4.8, reviewCount: 218,
    priceRange: '₹800 – ₹2,500 per plate', location: 'Delhi NCR',
    description: 'Award-winning catering service specializing in multi-cuisine menus with live counters, custom menus, and impeccable presentation.',
    image: '', verified: true, services: ['Indian', 'Continental', 'Chinese', 'Live Counters', 'Dessert Bar'],
    availability: true, yearsOfExperience: 12, completedEvents: 850,
  },
  {
    id: 'v3', name: 'PixelPerfect Studios', category: 'Photography', rating: 4.9, reviewCount: 412,
    priceRange: '₹50,000 – ₹3,00,000', location: 'Bangalore, Karnataka',
    description: 'Premium photography & cinematography team known for candid storytelling, drone shots, and cinematic wedding films.',
    image: '', verified: true, services: ['Candid Photography', 'Cinematic Video', 'Drone Shots', 'Photo Albums', 'Pre-wedding Shoots'],
    availability: true, yearsOfExperience: 10, completedEvents: 620,
  },
  {
    id: 'v4', name: 'Dreamscape Decorators', category: 'Decoration', rating: 4.7, reviewCount: 189,
    priceRange: '₹1,00,000 – ₹5,00,000', location: 'Hyderabad, Telangana',
    description: 'Transform your venue into a dream with our luxury décor service featuring floral arrangements, lighting design, and thematic setups.',
    image: '', verified: true, services: ['Floral Décor', 'Stage Design', 'Lighting', 'Theme Décor', 'Mandap Design'],
    availability: true, yearsOfExperience: 8, completedEvents: 430,
  },
  {
    id: 'v5', name: 'BeatDrop Entertainment', category: 'DJ & Sound', rating: 4.6, reviewCount: 156,
    priceRange: '₹30,000 – ₹1,50,000', location: 'Pune, Maharashtra',
    description: 'High-energy DJ & sound system rental with professional equipment, LED screens, and customized playlists for every occasion.',
    image: '', verified: true, services: ['DJ Setup', 'Sound System', 'LED Walls', 'Fog Machines', 'Custom Playlists'],
    availability: true, yearsOfExperience: 6, completedEvents: 350,
  },
  {
    id: 'v6', name: 'Lumière Lighting Co.', category: 'Lighting', rating: 4.8, reviewCount: 198,
    priceRange: '₹40,000 – ₹2,00,000', location: 'Chennai, Tamil Nadu',
    description: 'Architectural and event lighting specialists creating magical ambiences with intelligent LED systems and laser shows.',
    image: '', verified: true, services: ['Ambient Lighting', 'LED Installations', 'Laser Shows', 'Fairy Lights', 'Spotlight Rigs'],
    availability: true, yearsOfExperience: 9, completedEvents: 500,
  },
  {
    id: 'v7', name: 'Regal Rides Transport', category: 'Transportation', rating: 4.5, reviewCount: 134,
    priceRange: '₹15,000 – ₹1,00,000', location: 'Jaipur, Rajasthan',
    description: 'Premium fleet of luxury cars, vintage vehicles, and decorated carriages for grand wedding entries and guest transportation.',
    image: '', verified: true, services: ['Luxury Cars', 'Vintage Cars', 'Horse Carriage', 'Guest Shuttles', 'Airport Transfers'],
    availability: true, yearsOfExperience: 11, completedEvents: 700,
  },
  {
    id: 'v8', name: 'Bloom & Petal Florist', category: 'Florist', rating: 4.7, reviewCount: 167,
    priceRange: '₹25,000 – ₹2,00,000', location: 'Kolkata, West Bengal',
    description: 'Exquisite floral arrangements using premium imported and seasonal flowers for weddings, corporate events, and celebrations.',
    image: '', verified: false, services: ['Bridal Bouquets', 'Table Arrangements', 'Garlands', 'Mandap Flowers', 'Flower Walls'],
    availability: true, yearsOfExperience: 7, completedEvents: 380,
  },
  {
    id: 'v9', name: 'SweetTooth Bakery', category: 'Cake & Bakery', rating: 4.8, reviewCount: 245,
    priceRange: '₹5,000 – ₹50,000', location: 'Mumbai, Maharashtra',
    description: 'Artisan bakers crafting custom wedding cakes, dessert tables, and celebration confections with premium ingredients.',
    image: '', verified: true, services: ['Custom Cakes', 'Dessert Tables', 'Cupcakes', 'Pastries', 'Chocolate Fountains'],
    availability: true, yearsOfExperience: 10, completedEvents: 900,
  },
  {
    id: 'v10', name: 'StarStruck Entertainment', category: 'Entertainment', rating: 4.6, reviewCount: 178,
    priceRange: '₹50,000 – ₹5,00,000', location: 'Delhi NCR',
    description: 'Full-service entertainment company offering live bands, celebrity appearances, dance troupes, and interactive experiences.',
    image: '', verified: true, services: ['Live Bands', 'Dance Groups', 'Stand-up Comedy', 'Magic Shows', 'Fire Acts'],
    availability: true, yearsOfExperience: 14, completedEvents: 560,
  },
  {
    id: 'v11', name: 'Glamour Studio', category: 'Makeup & Styling', rating: 4.9, reviewCount: 389,
    priceRange: '₹20,000 – ₹1,50,000', location: 'Bangalore, Karnataka',
    description: 'Celebrity makeup artists and hair stylists providing luxury bridal and event styling with international cosmetic brands.',
    image: '', verified: true, services: ['Bridal Makeup', 'Hair Styling', 'Family Packages', 'Pre-wedding Glam', 'Mehendi Artist'],
    availability: true, yearsOfExperience: 12, completedEvents: 750,
  },
  {
    id: 'v12', name: 'CineVision Films', category: 'Videography', rating: 4.7, reviewCount: 201,
    priceRange: '₹60,000 – ₹4,00,000', location: 'Pune, Maharashtra',
    description: 'Award-winning videography team creating cinematic wedding films, same-day edits, and documentary-style event coverage.',
    image: '', verified: true, services: ['Cinematic Films', 'Same-Day Edit', 'Drone Coverage', 'Live Streaming', 'Highlight Reels'],
    availability: true, yearsOfExperience: 8, completedEvents: 420,
  },
];

// ── Event Planners ───────────────────────────────────────────
export const eventPlanners: EventPlanner[] = [
  {
    id: 'ep1', name: 'Ananya Sharma', rating: 4.9, reviewCount: 156,
    priceRange: '₹1,00,000 – ₹5,00,000', location: 'Mumbai, Maharashtra',
    description: 'Celebrity event planner with 15 years of experience in luxury weddings and high-profile corporate events.',
    image: '', verified: true, specializations: ['Wedding', 'Corporate Conference', 'Charity Gala'],
    yearsOfExperience: 15, eventsPlanned: 450, successRate: 99,
  },
  {
    id: 'ep2', name: 'Rajesh Khandelwal', rating: 4.8, reviewCount: 128,
    priceRange: '₹75,000 – ₹3,00,000', location: 'Delhi NCR',
    description: 'Renowned for spectacular themed events and seamless execution of large-scale celebrations with up to 5,000 guests.',
    image: '', verified: true, specializations: ['Wedding', 'Birthday Party', 'Anniversary'],
    yearsOfExperience: 12, eventsPlanned: 380, successRate: 98,
  },
  {
    id: 'ep3', name: 'Priya Mehta', rating: 4.7, reviewCount: 98,
    priceRange: '₹50,000 – ₹2,00,000', location: 'Bangalore, Karnataka',
    description: 'Innovative event designer specializing in intimate gatherings and eco-friendly celebrations with a modern aesthetic.',
    image: '', verified: true, specializations: ['Wedding', 'Baby Shower', 'Birthday Party', 'Graduation'],
    yearsOfExperience: 8, eventsPlanned: 220, successRate: 97,
  },
  {
    id: 'ep4', name: 'Vikram Singh Rathore', rating: 4.9, reviewCount: 201,
    priceRange: '₹2,00,000 – ₹10,00,000', location: 'Jaipur, Rajasthan',
    description: 'Royal wedding specialist known for destination weddings in palaces and heritage properties across Rajasthan.',
    image: '', verified: true, specializations: ['Wedding', 'Charity Gala', 'Product Launch'],
    yearsOfExperience: 18, eventsPlanned: 600, successRate: 99,
  },
];

// ── Events ───────────────────────────────────────────────────
export const events: Event[] = [
  {
    id: 'e1', title: 'Sharma-Gupta Royal Wedding', type: 'Wedding',
    date: '2026-09-15', time: '18:00', location: 'Royal Grand Palace, Mumbai',
    guestCount: 500, budget: 2500000, status: 'confirmed',
    description: 'A grand wedding celebration with traditional and modern elements.',
    customerId: 'c1', vendorIds: ['v1', 'v2', 'v3', 'v4'], plannerId: 'ep1', progress: 65,
  },
  {
    id: 'e2', title: 'TechVista Annual Conference 2026', type: 'Corporate Conference',
    date: '2026-10-20', time: '09:00', location: 'Hyatt Regency, Bangalore',
    guestCount: 1200, budget: 1800000, status: 'planning',
    description: 'Annual tech conference featuring keynotes, panels, and networking.',
    customerId: 'c1', vendorIds: ['v5', 'v6', 'v10'], progress: 30,
  },
  {
    id: 'e3', title: 'Aarav\'s 5th Birthday Bash', type: 'Birthday Party',
    date: '2026-08-25', time: '16:00', location: 'FunWorld Resort, Pune',
    guestCount: 80, budget: 150000, status: 'in-progress',
    description: 'Superhero themed birthday party with games, magic show, and custom cake.',
    customerId: 'c1', vendorIds: ['v9', 'v5'], progress: 80,
  },
  {
    id: 'e4', title: 'MBA Class of 2026 Graduation', type: 'Graduation',
    date: '2026-11-05', time: '10:00', location: 'IIM Campus, Ahmedabad',
    guestCount: 350, budget: 500000, status: 'planning',
    description: 'Formal graduation ceremony followed by dinner and celebration.',
    customerId: 'c1', vendorIds: ['v2', 'v3'], progress: 15,
  },
  {
    id: 'e5', title: 'Neha\'s Baby Shower', type: 'Baby Shower',
    date: '2026-08-30', time: '14:00', location: 'The Leela Palace, Delhi',
    guestCount: 60, budget: 200000, status: 'confirmed',
    description: 'Elegant pastel-themed baby shower with brunch, games, and photo booth.',
    customerId: 'c1', vendorIds: ['v4', 'v8', 'v9'], plannerId: 'ep3', progress: 50,
  },
  {
    id: 'e6', title: 'Silver Jubilee Anniversary', type: 'Anniversary',
    date: '2026-12-01', time: '19:00', location: 'Taj Lake Palace, Udaipur',
    guestCount: 150, budget: 800000, status: 'planning',
    description: '25th wedding anniversary celebration at a heritage lakeside palace.',
    customerId: 'c1', vendorIds: ['v1', 'v2', 'v3', 'v4', 'v6'], plannerId: 'ep4', progress: 10,
  },
];

// ── Bookings ─────────────────────────────────────────────────
export const bookings: Booking[] = [
  { id: 'b1', eventId: 'e1', vendorId: 'v1', customerId: 'c1', date: '2026-09-15', status: 'confirmed', amount: 500000, service: 'Venue Booking' },
  { id: 'b2', eventId: 'e1', vendorId: 'v2', customerId: 'c1', date: '2026-09-15', status: 'confirmed', amount: 400000, service: 'Catering (500 guests)' },
  { id: 'b3', eventId: 'e1', vendorId: 'v3', customerId: 'c1', date: '2026-09-15', status: 'confirmed', amount: 200000, service: 'Photography + Videography' },
  { id: 'b4', eventId: 'e1', vendorId: 'v4', customerId: 'c1', date: '2026-09-15', status: 'pending', amount: 300000, service: 'Full Decoration' },
  { id: 'b5', eventId: 'e2', vendorId: 'v5', customerId: 'c1', date: '2026-10-20', status: 'pending', amount: 100000, service: 'Sound System' },
  { id: 'b6', eventId: 'e2', vendorId: 'v6', customerId: 'c1', date: '2026-10-20', status: 'confirmed', amount: 150000, service: 'Conference Lighting' },
  { id: 'b7', eventId: 'e3', vendorId: 'v9', customerId: 'c1', date: '2026-08-25', status: 'completed', amount: 25000, service: 'Custom Birthday Cake' },
  { id: 'b8', eventId: 'e5', plannerId: 'ep3', customerId: 'c1', date: '2026-08-30', status: 'confirmed', amount: 100000, service: 'Full Event Planning' },
];

// ── Reviews ──────────────────────────────────────────────────
export const reviews: Review[] = [
  { id: 'r1', userId: 'c1', userName: 'Meera Patel', userAvatar: '', targetId: 'v1', rating: 5, comment: 'Absolutely stunning venue! The staff was incredibly professional and the ambiance was perfect for our wedding. Highly recommend!', date: '2026-07-15', eventType: 'Wedding' },
  { id: 'r2', userId: 'c2', userName: 'Arjun Reddy', userAvatar: '', targetId: 'v2', rating: 4.5, comment: 'The food was exquisite and presentation was top-notch. Our guests are still talking about the live pasta counter!', date: '2026-07-10', eventType: 'Corporate Conference' },
  { id: 'r3', userId: 'c3', userName: 'Sneha Kumar', userAvatar: '', targetId: 'v3', rating: 5, comment: 'The photographs captured every emotion perfectly. The cinematic wedding film brought tears to our eyes. Worth every penny!', date: '2026-06-28', eventType: 'Wedding' },
  { id: 'r4', userId: 'c4', userName: 'Ravi Shankar', userAvatar: '', targetId: 'v4', rating: 4, comment: 'Beautiful decorations that transformed the venue completely. Minor delay in setup but overall excellent work.', date: '2026-06-20', eventType: 'Birthday Party' },
  { id: 'r5', userId: 'c5', userName: 'Pooja Desai', userAvatar: '', targetId: 'ep1', rating: 5, comment: 'Ananya made our dream wedding come true! Her attention to detail is unmatched. She handled everything seamlessly.', date: '2026-07-01', eventType: 'Wedding' },
  { id: 'r6', userId: 'c6', userName: 'Karthik Nair', userAvatar: '', targetId: 'v5', rating: 4.5, comment: 'Amazing sound quality and the DJ kept the energy up all night. The LED wall was a great addition!', date: '2026-06-15', eventType: 'Birthday Party' },
];

// ── Notifications ────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'n1', title: 'Booking Confirmed', message: 'Royal Grand Palace has confirmed your venue booking for Sept 15.', type: 'success', read: false, timestamp: '2026-08-02T12:30:00', link: '/customer/bookings' },
  { id: 'n2', title: 'New Quote Received', message: 'Dreamscape Decorators sent you a quote for ₹3,00,000.', type: 'info', read: false, timestamp: '2026-08-02T10:15:00', link: '/customer/vendors' },
  { id: 'n3', title: 'Payment Reminder', message: 'Catering advance payment of ₹1,00,000 is due in 3 days.', type: 'warning', read: false, timestamp: '2026-08-01T16:45:00', link: '/customer/payments' },
  { id: 'n4', title: 'Event Updated', message: 'Your event "Sharma-Gupta Royal Wedding" timeline has been updated.', type: 'info', read: true, timestamp: '2026-08-01T09:20:00', link: '/customer/events/e1' },
  { id: 'n5', title: 'Review Request', message: 'Share your experience with SweetTooth Bakery for the birthday event.', type: 'info', read: true, timestamp: '2026-07-31T14:00:00', link: '/customer/reviews' },
  { id: 'n6', title: 'AI Suggestion', message: 'Based on your preferences, we recommend adding a photo booth to your wedding!', type: 'info', read: false, timestamp: '2026-08-02T08:00:00' },
];

// ── Chat Conversations ───────────────────────────────────────
export const chatConversations: ChatConversation[] = [
  {
    id: 'chat1',
    participants: [
      { id: 'c1', name: 'You', avatar: '', role: 'customer' },
      { id: 'v1', name: 'Royal Grand Palace', avatar: '', role: 'vendor' },
    ],
    lastMessage: 'The banquet hall is confirmed for September 15th. We\'ll send the floor plan by tomorrow.',
    lastMessageTime: '2026-08-02T11:30:00',
    unreadCount: 2,
  },
  {
    id: 'chat2',
    participants: [
      { id: 'c1', name: 'You', avatar: '', role: 'customer' },
      { id: 'ep1', name: 'Ananya Sharma', avatar: '', role: 'planner' },
    ],
    lastMessage: 'I\'ve finalized the vendor list. Let\'s discuss the décor theme in our call tomorrow.',
    lastMessageTime: '2026-08-02T09:15:00',
    unreadCount: 0,
  },
  {
    id: 'chat3',
    participants: [
      { id: 'c1', name: 'You', avatar: '', role: 'customer' },
      { id: 'v2', name: 'Gourmet Delights Catering', avatar: '', role: 'vendor' },
    ],
    lastMessage: 'Here\'s the updated menu with vegetarian and Jain options included.',
    lastMessageTime: '2026-08-01T17:45:00',
    unreadCount: 1,
  },
];

// ── Transactions ─────────────────────────────────────────────
export const transactions: Transaction[] = [
  { id: 't1', date: '2026-08-01', description: 'Venue Booking Advance - Royal Grand Palace', amount: 200000, status: 'completed', type: 'payment', eventName: 'Sharma-Gupta Royal Wedding' },
  { id: 't2', date: '2026-07-28', description: 'Photography Package - PixelPerfect Studios', amount: 150000, status: 'completed', type: 'payment', eventName: 'Sharma-Gupta Royal Wedding' },
  { id: 't3', date: '2026-07-25', description: 'Custom Cake Order - SweetTooth Bakery', amount: 25000, status: 'completed', type: 'payment', eventName: "Aarav's 5th Birthday Bash" },
  { id: 't4', date: '2026-07-20', description: 'Event Planning Fee - Ananya Sharma', amount: 100000, status: 'completed', type: 'payment', eventName: 'Sharma-Gupta Royal Wedding' },
  { id: 't5', date: '2026-08-02', description: 'Catering Advance - Gourmet Delights', amount: 100000, status: 'pending', type: 'payment', eventName: 'Sharma-Gupta Royal Wedding' },
  { id: 't6', date: '2026-07-15', description: 'Cancelled DJ Booking Refund', amount: 30000, status: 'refunded', type: 'refund', eventName: "Aarav's 5th Birthday Bash" },
];

// ── Guests (for guest management) ────────────────────────────
export const guests: Guest[] = [
  { id: 'g1', name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', rsvpStatus: 'accepted', mealPreference: 'Vegetarian', plusOne: true, tableNumber: 1 },
  { id: 'g2', name: 'Priyanka Chopra', email: 'priyanka@email.com', phone: '+91 98765 43211', rsvpStatus: 'accepted', mealPreference: 'Non-Vegetarian', plusOne: true, tableNumber: 1 },
  { id: 'g3', name: 'Amit Patel', email: 'amit@email.com', phone: '+91 98765 43212', rsvpStatus: 'pending', mealPreference: 'Jain', plusOne: false, tableNumber: 2 },
  { id: 'g4', name: 'Sunita Deshmukh', email: 'sunita@email.com', phone: '+91 98765 43213', rsvpStatus: 'declined', mealPreference: 'Vegetarian', plusOne: false },
  { id: 'g5', name: 'Vikash Kumar', email: 'vikash@email.com', phone: '+91 98765 43214', rsvpStatus: 'accepted', mealPreference: 'Non-Vegetarian', plusOne: true, tableNumber: 3 },
  { id: 'g6', name: 'Deepa Iyer', email: 'deepa@email.com', phone: '+91 98765 43215', rsvpStatus: 'invited', plusOne: false },
  { id: 'g7', name: 'Rohit Gupta', email: 'rohit@email.com', phone: '+91 98765 43216', rsvpStatus: 'accepted', mealPreference: 'Vegetarian', plusOne: true, tableNumber: 2 },
  { id: 'g8', name: 'Kavita Reddy', email: 'kavita@email.com', phone: '+91 98765 43217', rsvpStatus: 'pending', plusOne: false },
  { id: 'g9', name: 'Manish Tiwari', email: 'manish@email.com', phone: '+91 98765 43218', rsvpStatus: 'accepted', mealPreference: 'Non-Vegetarian', plusOne: false, tableNumber: 4 },
  { id: 'g10', name: 'Neha Agarwal', email: 'neha@email.com', phone: '+91 98765 43219', rsvpStatus: 'accepted', mealPreference: 'Vegan', plusOne: true, tableNumber: 5 },
];

// ── Tasks ────────────────────────────────────────────────────
export const tasks: Task[] = [
  { id: 'task1', title: 'Finalize venue layout', description: 'Confirm the seating arrangement and stage placement with venue manager.', assignedTo: 'Ananya Sharma', dueDate: '2026-08-10', priority: 'high', status: 'in-progress', eventId: 'e1' },
  { id: 'task2', title: 'Confirm catering menu', description: 'Finalize the menu with Gourmet Delights including dietary preferences.', assignedTo: 'Ananya Sharma', dueDate: '2026-08-15', priority: 'high', status: 'todo', eventId: 'e1' },
  { id: 'task3', title: 'Send digital invitations', description: 'Design and send digital invitations to all guests via WhatsApp and email.', assignedTo: 'You', dueDate: '2026-08-20', priority: 'medium', status: 'todo', eventId: 'e1' },
  { id: 'task4', title: 'Book makeup artist', description: 'Confirm bridal and family makeup package with Glamour Studio.', assignedTo: 'Ananya Sharma', dueDate: '2026-08-12', priority: 'medium', status: 'completed', eventId: 'e1' },
  { id: 'task5', title: 'Arrange guest transportation', description: 'Coordinate shuttle service for out-of-town guests from airport and hotels.', assignedTo: 'Regal Rides Transport', dueDate: '2026-09-01', priority: 'low', status: 'todo', eventId: 'e1' },
  { id: 'task6', title: 'Order superhero decorations', description: 'Order themed balloon arch, backdrop, and table centerpieces.', assignedTo: 'You', dueDate: '2026-08-18', priority: 'high', status: 'in-progress', eventId: 'e3' },
];

// ── Services (Vendor services) ───────────────────────────────
export const vendorServices: Service[] = [
  { id: 's1', name: 'Grand Ballroom Rental', description: 'Elegant ballroom accommodating up to 1000 guests with premium amenities.', price: 500000, duration: '12 hours', category: 'Venue' },
  { id: 's2', name: 'Garden Wedding Setup', description: 'Outdoor garden venue with mandap setup, seating, and ambient lighting.', price: 350000, duration: '10 hours', category: 'Venue' },
  { id: 's3', name: 'Premium Buffet (Veg)', description: 'Multi-cuisine vegetarian buffet with 15+ dishes, live counters, and desserts.', price: 1200, duration: 'Per plate', category: 'Catering' },
  { id: 's4', name: 'Premium Buffet (Non-Veg)', description: 'Multi-cuisine non-vegetarian buffet with 20+ dishes, live counters, and desserts.', price: 1800, duration: 'Per plate', category: 'Catering' },
  { id: 's5', name: 'Full Day Photography', description: 'Complete event coverage with 2 photographers, candid shots, and edited album.', price: 150000, duration: '12 hours', category: 'Photography' },
  { id: 's6', name: 'Cinematic Wedding Film', description: '4K cinematic wedding film with drone footage and same-day edit.', price: 250000, duration: 'Full event', category: 'Videography' },
];

// ── Packages ─────────────────────────────────────────────────
export const vendorPackages: Package[] = [
  { id: 'pkg1', name: 'Essential', description: 'Perfect for intimate gatherings and small celebrations.', price: 50000, services: ['Basic Photography', 'Simple Décor', '4-hour coverage'], popular: false, tier: 'basic' },
  { id: 'pkg2', name: 'Premium', description: 'Our most popular package for memorable celebrations.', price: 150000, services: ['Full Photography + Video', 'Premium Décor', 'Full-day coverage', 'Drone shots', 'Photo Album'], popular: true, tier: 'standard' },
  { id: 'pkg3', name: 'Royal', description: 'The ultimate luxury experience for grand events.', price: 400000, services: ['2 Photographers + Videographer', 'Luxury Décor', 'Full-day + After-party', 'Drone + Jib', 'Premium Album + Canvas', 'Same-day Edit', 'Pre-wedding Shoot'], popular: false, tier: 'premium' },
];

// ── FAQs ─────────────────────────────────────────────────────
export const faqs: FAQ[] = [
  { question: 'How does EventCrafts work?', answer: 'EventCrafts connects you with verified vendors and professional event planners. Simply create your event, set your preferences, and our AI-powered platform will match you with the best professionals. You can choose to plan yourself or hire an event planner.' },
  { question: 'Is there a fee to use EventCrafts?', answer: 'Creating an account and browsing vendors is completely free. We charge a small service fee only when you make a booking through our platform. Event planners and vendors set their own pricing.' },
  { question: 'How does the AI event planning work?', answer: 'Our AI analyzes your event type, budget, guest count, and preferences to recommend venues, vendors, themes, and timelines. It can estimate budgets, suggest décor, generate invitation designs, and even visualize your venue setup.' },
  { question: 'Are the vendors verified?', answer: 'Yes, all vendors go through a rigorous verification process including business documentation, portfolio review, and background checks. Verified vendors display a blue checkmark badge on their profiles.' },
  { question: 'Can I cancel or modify a booking?', answer: 'Yes, you can modify or cancel bookings based on the vendor\'s cancellation policy. Most vendors offer free cancellation up to 30 days before the event. Partial refunds may apply for later cancellations.' },
  { question: 'How do payments work?', answer: 'We offer secure payments through multiple methods including credit/debit cards, UPI, net banking, and EMI options. Payments are held in escrow and released to vendors after successful event completion.' },
  { question: 'What if I\'m not satisfied with a vendor?', answer: 'We have a satisfaction guarantee. If a vendor doesn\'t meet the agreed-upon standards, you can file a complaint and our support team will mediate. Refunds are issued on a case-by-case basis.' },
  { question: 'Do you offer destination wedding planning?', answer: 'Absolutely! We have a network of vendors and planners across India specializing in destination weddings. Our AI can help you find the perfect destination based on your preferences and budget.' },
];

// ── Testimonials ─────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  { id: 'test1', name: 'Meera & Rajan Patel', role: 'Wedding Couple', avatar: '', rating: 5, comment: 'EventCrafts made our dream wedding a reality! The AI budget estimator saved us ₹3 lakhs, and the vendor recommendations were spot-on. Couldn\'t have done it without them.', eventType: 'Wedding' },
  { id: 'test2', name: 'Sanjay Mittal', role: 'CEO, TechVista Solutions', avatar: '', rating: 5, comment: 'We used EventCrafts for our annual conference with 1,200 attendees. The platform streamlined everything from venue booking to catering. Truly enterprise-grade.', eventType: 'Corporate Conference' },
  { id: 'test3', name: 'Isha Verma', role: 'Mother & Party Planner', avatar: '', rating: 4.5, comment: 'Planned my daughter\'s birthday through EventCrafts and it was magical! The AI theme suggestions were creative and the vendors delivered beyond expectations.', eventType: 'Birthday Party' },
  { id: 'test4', name: 'Dr. Arun Khanna', role: 'Professor, IIM Ahmedabad', avatar: '', rating: 5, comment: 'The graduation ceremony we organized through EventCrafts was flawless. The event planner assigned to us was exceptional and handled every detail perfectly.', eventType: 'Graduation' },
  { id: 'test5', name: 'Nisha & Aditya Joshi', role: 'Anniversary Celebrants', avatar: '', rating: 5, comment: 'Our 25th anniversary at Taj Lake Palace was organized entirely through EventCrafts. The AI venue visualization feature helped us choose the perfect setup before booking!', eventType: 'Anniversary' },
];

// ── Complaints (Admin) ───────────────────────────────────────
export const complaints: Complaint[] = [
  { id: 'comp1', userId: 'c2', userName: 'Arjun Reddy', subject: 'Vendor no-show for photography', description: 'The photographer assigned for my corporate event did not show up on time.', status: 'in-progress', priority: 'high', date: '2026-07-28', category: 'Vendor Issue' },
  { id: 'comp2', userId: 'c3', userName: 'Sneha Kumar', subject: 'Incorrect billing amount', description: 'I was charged ₹50,000 extra compared to the agreed quote for decoration services.', status: 'open', priority: 'medium', date: '2026-08-01', category: 'Billing' },
  { id: 'comp3', userId: 'c5', userName: 'Pooja Desai', subject: 'Food quality below expectations', description: 'The catering quality at the reception was significantly below what was promised during the tasting.', status: 'resolved', priority: 'high', date: '2026-07-20', category: 'Quality' },
];

// ── Invitation Templates ─────────────────────────────────────
export const invitationTemplates: InvitationTemplate[] = [
  { id: 'inv1', name: 'Royal Elegance', category: 'Wedding', image: '', popular: true },
  { id: 'inv2', name: 'Modern Minimalist', category: 'Wedding', image: '', popular: true },
  { id: 'inv3', name: 'Floral Dreams', category: 'Wedding', image: '', popular: false },
  { id: 'inv4', name: 'Corporate Professional', category: 'Corporate Conference', image: '', popular: true },
  { id: 'inv5', name: 'Fun & Colorful', category: 'Birthday Party', image: '', popular: true },
  { id: 'inv6', name: 'Elegant Script', category: 'Anniversary', image: '', popular: false },
  { id: 'inv7', name: 'Pastel Garden', category: 'Baby Shower', image: '', popular: true },
  { id: 'inv8', name: 'Academic Achievement', category: 'Graduation', image: '', popular: false },
];

// ── Event Categories ─────────────────────────────────────────
export const eventCategories = [
  { name: 'Wedding', icon: 'Heart', count: 2450, color: 'from-pink-500 to-rose-500' },
  { name: 'Corporate Conference', icon: 'Briefcase', count: 1830, color: 'from-blue-500 to-indigo-500' },
  { name: 'Birthday Party', icon: 'Cake', count: 3200, color: 'from-amber-400 to-orange-500' },
  { name: 'Graduation', icon: 'GraduationCap', count: 890, color: 'from-emerald-500 to-green-600' },
  { name: 'Baby Shower', icon: 'Baby', count: 1120, color: 'from-purple-400 to-pink-400' },
  { name: 'Anniversary', icon: 'Gift', count: 1560, color: 'from-accent-400 to-accent-600' },
  { name: 'Charity Gala', icon: 'Sparkles', count: 420, color: 'from-teal-500 to-cyan-500' },
  { name: 'Product Launch', icon: 'Rocket', count: 680, color: 'from-violet-500 to-purple-600' },
];

// ── Current User ─────────────────────────────────────────────
export const currentUser = {
  id: 'c1',
  name: 'Aditya Sharma',
  email: 'aditya.sharma@email.com',
  avatar: '',
  role: 'customer' as const,
  phone: '+91 98765 12345',
  location: 'Mumbai, Maharashtra',
  joinedDate: '2025-06-15',
};
