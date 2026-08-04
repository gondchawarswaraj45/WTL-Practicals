import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays, CalendarPlus, Store, UserCheck, MapPin, UtensilsCrossed, Palette, Camera,
  Music, Lightbulb, Truck, Brain, Sparkles, Calculator, Users, Mail as MailIcon,
  BarChart3, MessageCircle, CreditCard, Bell, Star, User, Settings, Wand2, Bot, Eye,
  Filter, Grid3X3, List, Search, ChevronRight, BadgeCheck, Clock, Send, Paperclip,
  ChevronDown, Download, Plus, Trash2, Edit, LayoutDashboard, CheckCircle2, XCircle,
  AlertTriangle, TrendingUp, X, Upload, Check, Image as ImageIcon, FileText, Share2, Copy,
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { StatCard, Badge, GlassCard, StarRating, Avatar, ProgressBar, SearchInput, Modal } from '@/components/ui';
import {
  events, vendors as initialVendors, eventPlanners, notifications, transactions, guests as initialGuests,
  chatConversations, reviews as initialReviews, tasks as initialTasks, invitationTemplates, vendorPackages,
} from '@/data';
import { formatCurrency, formatDate, formatRelativeTime, cn } from '@/lib/utils';
import type { Guest, Review, Task } from '@/types';

// ── Customer Sidebar Config ──────────────────────────────────
export const customerSidebarSections = [
  { title: 'Main', items: [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/customer' },
    { label: 'Create Event', icon: <CalendarPlus size={18} />, path: '/customer/create-event' },
    { label: 'My Events', icon: <CalendarDays size={18} />, path: '/customer/events' },
    { label: 'Track Event Progress', icon: <TrendingUp size={18} />, path: '/customer/ai-progress' },
  ]},
  { title: 'Book Services', items: [
    { label: 'Browse Vendors', icon: <Store size={18} />, path: '/customer/vendors' },
    { label: 'Hire Event Planner', icon: <UserCheck size={18} />, path: '/customer/hire-planner' },
    { label: 'Book Venue', icon: <MapPin size={18} />, path: '/customer/venues' },
    { label: 'Book Catering', icon: <UtensilsCrossed size={18} />, path: '/customer/catering' },
    { label: 'Book Decoration', icon: <Palette size={18} />, path: '/customer/decoration' },
    { label: 'Book Photography & Video', icon: <Camera size={18} />, path: '/customer/photography' },
    { label: 'Book DJ & Sound', icon: <Music size={18} />, path: '/customer/dj-sound' },
    { label: 'Book Lighting Service', icon: <Lightbulb size={18} />, path: '/customer/lighting' },
    { label: 'Book Transportation', icon: <Truck size={18} />, path: '/customer/transportation' },
  ]},
  { title: 'AI Features & Suite', items: [
    { label: 'AI Speech & Vow Writer', icon: <FileText size={18} />, path: '/customer/ai-speech' },
    { label: 'AI Seating Planner', icon: <Users size={18} />, path: '/customer/ai-seating' },
    { label: 'AI Emergency Assistant', icon: <AlertTriangle size={18} />, path: '/customer/ai-contingency' },
    { label: 'AI Venue Visualization', icon: <Eye size={18} />, path: '/customer/ai-venue' },
    { label: 'AI Theme & Moodboard', icon: <Wand2 size={18} />, path: '/customer/ai-theme' },
    { label: 'AI Vendor Recommender', icon: <Store size={18} />, path: '/customer/ai-vendors' },
    { label: 'AI Catering Quantity', icon: <UtensilsCrossed size={18} />, path: '/customer/ai-catering' },
    { label: 'AI Timeline Generator', icon: <Clock size={18} />, path: '/customer/ai-timeline' },
    { label: 'AI Budget Estimator', icon: <Calculator size={18} />, path: '/customer/ai-budget' },
    { label: 'AI Planning Chatbot', icon: <Bot size={18} />, path: '/customer/ai-assistant' },
  ]},
  { title: 'Management', items: [
    { label: 'Guest Management', icon: <Users size={18} />, path: '/customer/guests' },
    { label: 'Digital Invitations & RSVP', icon: <MailIcon size={18} />, path: '/customer/invitations' },
    { label: 'RSVP Tracking', icon: <BarChart3 size={18} />, path: '/customer/rsvp' },
  ]},
  { title: 'Account', items: [
    { label: 'Chat', icon: <MessageCircle size={18} />, path: '/customer/chat', badge: 3 },
    { label: 'Payments Management', icon: <CreditCard size={18} />, path: '/customer/payments' },
    { label: 'Notifications & Reminders', icon: <Bell size={18} />, path: '/customer/notifications', badge: 4 },
    { label: 'Reviews & Ratings', icon: <Star size={18} />, path: '/customer/reviews' },
    { label: 'Profile', icon: <User size={18} />, path: '/customer/profile' },
  ]},
];

const SB = { sidebarSections: customerSidebarSections, roleLabel: 'Customer' as const, roleColor: 'text-primary-500' };

// ============================================================
// My Events Page
// ============================================================
export const MyEventsPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  return (
    <DashboardLayout {...SB}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">My Events</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setView('grid')} className={cn('p-2 rounded-md transition-colors', view === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500')}><Grid3X3 size={16} /></button>
            <button onClick={() => setView('list')} className={cn('p-2 rounded-md transition-colors', view === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500')}><List size={16} /></button>
          </div>
          <Link to="/customer/create-event" className="btn-primary text-sm"><CalendarPlus size={16} />New Event</Link>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {events.map((event) => (
          <GlassCard key={event.id} hover className="p-5 cursor-pointer" onClick={() => setSelectedEvent(event)}>
            <div className="flex items-start justify-between mb-3">
              <Badge variant={event.status === 'confirmed' ? 'success' : event.status === 'in-progress' ? 'warning' : event.status === 'completed' ? 'success' : 'info'}>
                {event.status.replace('-', ' ')}
              </Badge>
              <span className="text-xs text-gray-400 font-medium">{event.type}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
            <div className="space-y-1 text-sm text-gray-500">
              <p className="flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(event.date)} · {event.time}</p>
              <p className="flex items-center gap-1.5"><MapPin size={14} />{event.location}</p>
              <p className="flex items-center gap-1.5"><Users size={14} />{event.guestCount} guests</p>
            </div>
            {event.progress !== undefined && (
              <div className="mt-4"><ProgressBar value={event.progress} size="sm" /></div>
            )}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-primary-600">{formatCurrency(event.budget)}</span>
              <button className="text-sm font-semibold text-primary-500 hover:underline">View Details</button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Event Details Modal */}
      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title={selectedEvent?.title || 'Event Details'} size="lg">
        {selectedEvent && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <Badge variant={selectedEvent.status === 'confirmed' ? 'success' : 'info'}>{selectedEvent.status}</Badge>
              <span className="text-sm font-semibold text-primary-600">{formatCurrency(selectedEvent.budget)} Budget</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
              <div><p className="text-gray-500 text-xs">Date & Time</p><p className="font-semibold text-gray-900">{formatDate(selectedEvent.date)} at {selectedEvent.time}</p></div>
              <div><p className="text-gray-500 text-xs">Location</p><p className="font-semibold text-gray-900">{selectedEvent.location}</p></div>
              <div><p className="text-gray-500 text-xs">Guest Count</p><p className="font-semibold text-gray-900">{selectedEvent.guestCount} Guests</p></div>
              <div><p className="text-gray-500 text-xs">Category</p><p className="font-semibold text-gray-900">{selectedEvent.type}</p></div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Planning Progress</p>
              <ProgressBar value={selectedEvent.progress || 50} />
            </div>
            <div className="flex gap-3 justify-end pt-3">
              <Link to="/customer/ai-progress" className="btn-secondary text-sm">Track Progress</Link>
              <button onClick={() => setSelectedEvent(null)} className="btn-primary text-sm">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

// ============================================================
// Browse Vendors Page
// ============================================================
export const BrowseVendorsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingVendor, setBookingVendor] = useState<any | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('');

  const categories = ['All', 'Venue', 'Catering', 'Photography', 'Decoration', 'DJ & Sound', 'Lighting', 'Transportation', 'Florist', 'Cake & Bakery', 'Entertainment', 'Makeup & Styling', 'Videography'];
  
  const filteredVendors = initialVendors.filter((v) => {
    const matchesCat = selectedCategory === 'All' || v.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBookVendor = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingVendor(null);
    }, 2000);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Browse Verified Vendors</h1>
          <p className="text-sm text-gray-500 mt-1">Explore top event service providers verified by EventCrafts.</p>
        </div>
        <div className="w-full md:w-72">
          <SearchInput placeholder="Search vendor name, service..." value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all',
              selectedCategory === cat
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/60'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.map((vendor) => (
          <GlassCard key={vendor.id} hover className="p-5 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] bg-gray-100 rounded-xl mb-4 overflow-hidden relative group">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <Badge variant="gold" className="absolute top-3 left-3">{vendor.category}</Badge>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-lg">{vendor.name}</h3>
                <StarRating rating={vendor.rating} size={14} />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-2"><MapPin size={12} />{vendor.location}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">{vendor.description}</p>
            </div>
            <div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-3">
                <span className="text-xs text-gray-400 font-medium">Starting at</span>
                <span className="font-bold text-primary-600 text-base">{vendor.priceRange}</span>
              </div>
              <button onClick={() => setBookingVendor(vendor)} className="btn-primary w-full text-xs py-2.5">
                Book / Request Quote
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal isOpen={!!bookingVendor} onClose={() => setBookingVendor(null)} title={`Book ${bookingVendor?.name}`} size="md">
        {bookingSuccess ? (
          <div className="p-6 text-center space-y-3">
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto animate-bounce" />
            <h3 className="font-bold text-xl text-gray-900">Booking Request Sent!</h3>
            <p className="text-xs text-gray-500">Vendor has been notified. Check your messages for confirmation.</p>
          </div>
        ) : (
          <form onSubmit={handleBookVendor} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Event Date</label>
              <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Selected Package / Service</label>
              <select className="input-field">
                <option>Full Day Premium Package - ₹1,50,000</option>
                <option>Standard Ceremony Package - ₹85,000</option>
                <option>Custom Quotation Request</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Special Requirements / Notes</label>
              <textarea className="input-field h-24" placeholder="Mention guest count, setup timing, custom themes..." />
            </div>
            <button type="submit" className="btn-primary w-full py-3">Submit Booking Request</button>
          </form>
        )}
      </Modal>
    </DashboardLayout>
  );
};

// ============================================================
// Hire Planner & Category Helper Page
// ============================================================
export const HirePlannerPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Hire Expert Event Planners</h1>
    <p className="text-gray-500 mb-6">Let certified planners manage vendors, schedules, and decor end-to-end.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {eventPlanners.map((planner) => (
        <GlassCard key={planner.id} hover className="p-6 text-center flex flex-col justify-between">
          <div>
            <Avatar name={planner.name} size="xl" className="mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg">{planner.name}</h3>
            <p className="text-xs text-primary-600 font-semibold mt-0.5">{planner.specializations.join(', ')}</p>
            <div className="flex justify-center gap-4 my-3 text-xs text-gray-500">
              <span>⭐ {planner.rating} Rating</span>
              <span>💼 {planner.yearsOfExperience}+ Yrs Exp</span>
            </div>
          </div>
          <button onClick={() => alert(`Consultation requested with ${planner.name}`)} className="btn-primary w-full text-xs py-2.5">
            Book Consultation
          </button>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

export const VendorCategoryPage: React.FC<{ category: string; icon: React.ReactNode }> = ({ category, icon }) => (
  <DashboardLayout {...SB}>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">{icon}</div>
      <h1 className="font-display text-2xl font-bold text-gray-900">{category} Services</h1>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialVendors.slice(0, 4).map((vendor) => (
        <GlassCard key={vendor.id} className="p-5">
          <h3 className="font-bold text-gray-900">{vendor.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{vendor.location}</p>
          <p className="text-sm font-semibold text-primary-600 mt-3">{vendor.priceRange}</p>
          <button onClick={() => alert(`Requested quote for ${category}`)} className="btn-primary w-full mt-4 text-xs py-2">Get Quotation</button>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

// ============================================================
// NEW AI FEATURE: AI Speech & Vow Writer Page
// ============================================================
export const AISpeechPage: React.FC = () => {
  const [role, setRole] = useState('Best Man Toast');
  const [tone, setTone] = useState('Humorous & Heartfelt');
  const [personName, setPersonName] = useState('Rahul & Ananya');
  const [memoryDetails, setMemoryDetails] = useState('Met in college, traveled to Goa together, loves late night pizza parties.');
  const [generating, setGenerating] = useState(false);
  const [generatedSpeech, setGeneratedSpeech] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateSpeech = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedSpeech(
        `Ladies and Gentlemen, family and friends,\n\nWelcome to this magical day celebrating ${personName}!\n\n` +
        `When I first heard about their story, especially the memories around ${memoryDetails}, I knew they were meant for each other. ` +
        `Rahul has always been the adventurous one, while Ananya brings the warmth and grace that turns any moment into a memory.\n\n` +
        `[Pause for smiles & applause]\n\n` +
        `To the happy couple: May your life together be filled with endless laughter, late-night pizza runs, and love that grows stronger every single day.\n\n` +
        `Let us raise a glass to ${personName}! Cheers!`
      );
    }, 1200);
  };

  const handleCopy = () => {
    if (generatedSpeech) {
      navigator.clipboard.writeText(generatedSpeech);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <FileText size={22} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">AI Speech & Vow Writer</h1>
          <p className="text-xs text-gray-500">Craft heartfelt wedding vows, best man toasts, or host speeches in seconds.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Controls */}
        <GlassCard className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Speaker Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
              <option>Best Man Toast</option>
              <option>Maid of Honor Speech</option>
              <option>Bride Wedding Vows</option>
              <option>Groom Wedding Vows</option>
              <option>Father of Bride Speech</option>
              <option>Event Host / MC Welcome</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Tone & Atmosphere</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="input-field">
              <option>Humorous & Heartfelt</option>
              <option>Emotional & Romantic</option>
              <option>Formal & Elegant</option>
              <option>Short & Poetic</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Couple / Person Name</label>
            <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} className="input-field" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Key Anecdotes / Fun Memories</label>
            <textarea value={memoryDetails} onChange={(e) => setMemoryDetails(e.target.value)} className="input-field h-28" />
          </div>

          <button onClick={handleGenerateSpeech} disabled={generating} className="btn-primary w-full py-3 text-sm">
            <Sparkles size={16} />
            {generating ? 'AI Writing Speech...' : 'Generate AI Speech'}
          </button>
        </GlassCard>

        {/* Output */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">AI Generated Script</h3>
              {generatedSpeech && (
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  ⏱️ ~3.5 min read
                </span>
              )}
            </div>

            {generatedSpeech ? (
              <div className="p-4 bg-slate-50 rounded-xl font-serif text-sm leading-relaxed text-gray-800 whitespace-pre-line border border-gray-100 max-h-96 overflow-y-auto custom-scrollbar">
                {generatedSpeech}
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-center p-6 text-gray-400 text-xs">
                Click "Generate AI Speech" to craft your personalized wedding vows or toast.
              </div>
            )}
          </div>

          {generatedSpeech && (
            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4">
              <button onClick={handleCopy} className="btn-primary flex-1 text-xs py-2.5">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied to Clipboard!' : 'Copy Script'}
              </button>
              <button onClick={() => alert('Speech downloaded as text file!')} className="btn-secondary text-xs py-2.5">
                <Download size={14} /> Download PDF
              </button>
            </div>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// NEW AI FEATURE: AI Seating Planner Page
// ============================================================
export const AISeatingPage: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1 - VIP Head Table', capacity: 8, category: 'VIP', guests: ['Aditya Sharma', 'Priya Sharma', 'Rajesh K.', 'Sunita K.', 'Chief Guest A', 'Chief Guest B', 'VVIP Guest 1', 'VVIP Guest 2'] },
    { id: 2, name: 'Table 2 - Groom Family', capacity: 8, category: 'Family', guests: ['Uncle Ramesh', 'Aunt Meena', 'Cousin Rohan', 'Cousin Simran', 'Grandma K.', 'Grandpa K.', 'Family Friend 1', 'Family Friend 2'] },
    { id: 3, name: 'Table 3 - Bride Family', capacity: 8, category: 'Family', guests: ['Uncle Suresh', 'Aunt Geeta', 'Cousin Vivek', 'Cousin Neha', 'Grandma S.', 'Grandpa S.', 'Family Friend 3', 'Family Friend 4'] },
    { id: 4, name: 'Table 4 - College Squad', capacity: 8, category: 'Friends', guests: ['Karan V.', 'Aman P.', 'Sneha R.', 'Vikram M.', 'Pooja T.', 'Arjun B.', 'Mehak D.', 'Sahil K.'] },
    { id: 5, name: 'Table 5 - Tech / Work Colleagues', capacity: 8, category: 'Work', guests: ['Manager Dave', 'Lead Sarah', 'Dev Alex', 'Designer Lisa', 'Dev Chris', 'QA Nina', 'PM Rob', 'HR Tina'] },
  ]);

  const handleSmartArrange = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert('AI Seating Arrangement Optimized! VIPs placed near stage, families grouped together.');
    }, 1000);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Users size={22} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">AI Smart Seating Planner</h1>
            <p className="text-xs text-gray-500">Auto-organize guests into tables based on family groups, VIPs, and relationships.</p>
          </div>
        </div>
        <button onClick={handleSmartArrange} disabled={generating} className="btn-primary text-sm">
          <Sparkles size={16} />
          {generating ? 'Optimizing Seating...' : 'Re-Run AI Seating Algorithm'}
        </button>
      </div>

      {/* Tables Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map((table) => (
          <GlassCard key={table.id} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm">{table.name}</h3>
              <Badge variant={table.category === 'VIP' ? 'gold' : table.category === 'Family' ? 'primary' : 'info'}>
                {table.category}
              </Badge>
            </div>
            <div className="space-y-1.5 mb-4">
              {table.guests.map((guest, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50/80 rounded-lg text-xs font-medium text-gray-700">
                  <span>🪑 Seat {idx + 1}: {guest}</span>
                  <span className="text-[10px] text-gray-400">Confirmed</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>Capacity: {table.guests.length} / {table.capacity}</span>
              <button onClick={() => alert(`Added guest to ${table.name}`)} className="text-primary-600 font-semibold hover:underline">+ Add Seat</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// NEW AI FEATURE: AI Emergency Contingency Assistant
// ============================================================
export const AIContingencyPage: React.FC = () => {
  const [riskType, setRiskType] = useState('Rain & Weather');
  const [assessing, setAssessing] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(true);

  const handleAssessRisk = () => {
    setAssessing(true);
    setTimeout(() => {
      setAssessing(false);
      setPlanGenerated(true);
    }, 1000);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <AlertTriangle size={22} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">AI Emergency & Run-of-Show Assistant</h1>
          <p className="text-xs text-gray-500">Real-time risk assessment and Plan B execution protocols for your event day.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-gray-900 text-base">Select Risk Scenario</h3>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Potential Risk Factor</label>
            <select value={riskType} onChange={(e) => setRiskType(e.target.value)} className="input-field">
              <option>Rain & Weather Contingency</option>
              <option>Catering / Food Delay (30+ mins)</option>
              <option>Sound System & Power Outage</option>
              <option>Key VIP Traffic Delay</option>
            </select>
          </div>
          <button onClick={handleAssessRisk} disabled={assessing} className="btn-gold w-full text-xs py-3">
            <Sparkles size={16} />
            {assessing ? 'Evaluating Risks...' : 'Generate Plan B Protocol'}
          </button>
        </GlassCard>

        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Plan B Action Protocol: {riskType}</h3>
              <Badge variant="warning">High Priority Checklist</Badge>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-xl">
                <p className="text-xs font-bold text-amber-900">1. Instant Waterproof Canopy Protocol</p>
                <p className="text-xs text-amber-700 mt-1">Deploy waterproof side shades for outdoor lawn within 15 minutes. Move electric sound gear to indoor foyer.</p>
              </div>
              <div className="p-3.5 bg-slate-50 border border-gray-100 rounded-xl">
                <p className="text-xs font-bold text-gray-900">2. Guest Transition Notification</p>
                <p className="text-xs text-gray-600 mt-1">Broadcast SMS/WhatsApp update to guests guiding them to the glass banquet hall entrance.</p>
              </div>
              <div className="p-3.5 bg-slate-50 border border-gray-100 rounded-xl">
                <p className="text-xs font-bold text-gray-900">3. Buffer Time Schedule Adjustment</p>
                <p className="text-xs text-gray-600 mt-1">Shift cake cutting ceremony forward by 20 minutes to maintain crowd engagement.</p>
              </div>
            </div>
            <button onClick={() => alert('Emergency alert sent to event coordinator!')} className="btn-primary w-full mt-5 text-xs py-2.5">
              Notify Event Coordinator & Vendors
            </button>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// AI Venue Visualization
// ============================================================
export const AIVenuePage: React.FC = () => {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [rendered, setRendered] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoName(e.target.files[0].name);
      setPhotoUploaded(true);
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setRendered(true);
    }, 1500);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
          <Eye size={22} />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900">AI Venue 3D Visualization</h1>
      </div>
      <p className="text-gray-500 mb-6">Upload your venue photos or pick a sample hall to preview custom seating, mandap, and stage layouts.</p>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-5">
          <h3 className="font-bold text-gray-900">1. Select Venue Photo & Preferences</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-primary-400 transition-colors cursor-pointer bg-gray-50/50">
            <input type="file" id="venue-photo" className="hidden" onChange={handleFileUpload} accept="image/*" />
            <label htmlFor="venue-photo" className="cursor-pointer">
              <Upload size={32} className="mx-auto text-primary-500 mb-2" />
              {photoUploaded ? (
                <p className="font-semibold text-sm text-emerald-600">✓ Uploaded: {photoName}</p>
              ) : (
                <>
                  <p className="font-semibold text-sm text-gray-700">Click to upload venue image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </label>
          </div>

          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Banquet / Venue Space</label><select className="input-field"><option>Royal Grand Palace - Main Hall</option><option>Uploaded Custom Venue Photo</option><option>Garden Outdoor Space</option></select></div>
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Layout Style</label><select className="input-field"><option>Royal Banquet Seating</option><option>Theater & Stage Setup</option><option>Cocktail Lounge Setup</option></select></div>
            <div><label className="text-xs font-semibold text-gray-700 block mb-1">Guest Count Capacity</label><input type="number" className="input-field" defaultValue={500} /></div>
            <button onClick={handleGenerate} disabled={generating} className="btn-primary w-full text-base py-3">
              <Sparkles size={18} />
              {generating ? 'AI Generating 3D Render...' : 'Generate AI Venue Render'}
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">2. AI Render Preview</h3>
            {rendered ? (
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-primary-600 via-purple-700 to-accent-600 rounded-2xl relative flex items-center justify-center text-white overflow-hidden shadow-lg">
                  <div className="relative z-10 text-center p-6">
                    <Sparkles size={40} className="mx-auto mb-2 text-accent-300 animate-pulse" />
                    <h4 className="font-bold text-xl">AI Rendered Royal Banquet Hall</h4>
                    <p className="text-xs text-primary-200 mt-1">Generated for 500 Guests</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-center p-6 border-2 border-dashed border-gray-200">
                <div>
                  <Eye size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="font-semibold text-gray-600">No Render Generated Yet</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Generate AI Venue Render" to start</p>
                </div>
              </div>
            )}
          </div>
          {rendered && (
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => alert('Venue layout saved to event!')} className="btn-primary flex-1 text-sm"><Check size={16} />Save Layout</button>
              <button onClick={() => alert('HD render downloaded!')} className="btn-secondary text-sm"><Download size={16} />Download HD</button>
            </div>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// AI Theme & Moodboard Generator
// ============================================================
export const AIThemePage: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<any | null>(null);
  const themes = [
    { name: 'Royal Maharaja', colors: ['#8B0000', '#DAA520', '#800020', '#F5DEB3'], tags: ['Traditional', 'Luxury', 'Gold Accents'], match: 95 },
    { name: 'Enchanted Floral Garden', colors: ['#2E8B57', '#FFB6C1', '#F0E68C', '#FFFFFF'], tags: ['Nature', 'Romantic', 'Fresh Flowers'], match: 88 },
    { name: 'Modern Minimalist', colors: ['#2C3E50', '#ECF0F1', '#3498DB', '#E74C3C'], tags: ['Clean', 'Contemporary', 'Sleek'], match: 82 },
    { name: 'Vintage Heritage', colors: ['#D4A5A5', '#F3E5AB', '#927A5A', '#FFFDD0'], tags: ['Nostalgic', 'Warm', 'Pastel'], match: 79 },
    { name: 'Midnight Glamour', colors: ['#0C0C1D', '#C0A062', '#1C2541', '#FFFFFF'], tags: ['Dark Mode', 'Dramatic', 'LED Lights'], match: 76 },
    { name: 'Bohemian Sunset', colors: ['#E76F51', '#F4A261', '#E9C46A', '#2A9D8F'], tags: ['Rustic', 'Earthy', 'Warm Lights'], match: 71 },
  ];

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><Wand2 size={22} /></div>
        <h1 className="font-display text-2xl font-bold text-gray-900">AI Theme & Moodboard Generator</h1>
      </div>
      <p className="text-gray-500 mb-6">AI-analyzed color palettes, mood boards, and decoration concepts for your event.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <GlassCard key={theme.name} hover className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{theme.name}</h3>
                <Badge variant="primary">{theme.match}% match</Badge>
              </div>
              <div className="flex gap-1.5 mb-3">
                {theme.colors.map((color, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg shadow-sm border border-black/10" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {theme.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-[10px] font-semibold bg-gray-100 rounded-full text-gray-600">{tag}</span>
                ))}
              </div>
            </div>
            <button onClick={() => setSelectedTheme(theme)} className="btn-primary w-full text-sm !py-2">Apply Theme</button>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={!!selectedTheme} onClose={() => setSelectedTheme(null)} title={`Apply ${selectedTheme?.name}`} size="md">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Applying <strong>{selectedTheme?.name}</strong> to your event will automatically sync decoration guidelines for caterers, decorators, and florists.</p>
          <button onClick={() => { alert(`Theme ${selectedTheme?.name} applied!`); setSelectedTheme(null); }} className="btn-primary w-full">Confirm & Apply Theme</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

// ============================================================
// AI Vendors & Catering
// ============================================================
export const AIVendorsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">AI Vendor Recommendation</h1>
    <p className="text-gray-500 mb-6">AI matches vendors to your exact budget, guest count, and event criteria.</p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialVendors.slice(0, 3).map((vendor) => (
        <GlassCard key={vendor.id} className="p-5">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="gold">98% AI Match</Badge>
            <span className="text-xs text-gray-400">{vendor.category}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg">{vendor.name}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{vendor.description}</p>
          <p className="text-sm font-semibold text-primary-600 mt-3">{vendor.priceRange}</p>
          <button onClick={() => alert(`Selected ${vendor.name}`)} className="btn-primary w-full mt-4 text-xs !py-2">Book AI Recommendation</button>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

export const AICateringPage: React.FC = () => {
  const [guestsCount, setGuestsCount] = useState(500);

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">AI Catering Quantity Estimation</h1>
      <p className="text-gray-500 mb-6">Accurate food & beverage quantity predictions to eliminate waste and optimize budget.</p>

      <GlassCard className="p-6 mb-6">
        <div className="max-w-xs mb-6">
          <label className="text-xs font-semibold text-gray-700 block mb-1">Enter Guest Count</label>
          <input type="number" value={guestsCount} onChange={(e) => setGuestsCount(Number(e.target.value))} className="input-field" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-primary-50 rounded-xl text-center"><p className="text-2xl font-bold text-primary-600">{Math.round(guestsCount * 0.3)} kg</p><p className="text-xs text-gray-500 mt-1">Main Course / Rice</p></div>
          <div className="p-4 bg-emerald-50 rounded-xl text-center"><p className="text-2xl font-bold text-emerald-600">{Math.round(guestsCount * 1.2)} pcs</p><p className="text-xs text-gray-500 mt-1">Starters / Appetizers</p></div>
          <div className="p-4 bg-amber-50 rounded-xl text-center"><p className="text-2xl font-bold text-amber-600">{Math.round(guestsCount * 0.15)} L</p><p className="text-xs text-gray-500 mt-1">Gravy & Soups</p></div>
          <div className="p-4 bg-purple-50 rounded-xl text-center"><p className="text-2xl font-bold text-purple-600">{Math.round(guestsCount * 1.1)} servings</p><p className="text-xs text-gray-500 mt-1">Desserts & Ice Cream</p></div>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};

export const AITimelinePage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">AI Event Timeline Generator</h1>
    <p className="text-gray-500 mb-6">Auto-generated event schedule and execution timeline.</p>

    <GlassCard className="p-6 space-y-4">
      {[
        { time: '04:00 PM', task: 'Vendor Arrival & Stage Setup', status: 'Completed' },
        { time: '06:00 PM', task: 'Guest Arrival & Welcome Drinks', status: 'In Progress' },
        { time: '07:30 PM', task: 'Main Ceremony & Stage Performance', status: 'Pending' },
        { time: '09:00 PM', task: 'Buffet Dinner & DJ Party', status: 'Pending' },
      ].map((item, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary-600 bg-primary-100 px-3 py-1.5 rounded-lg">{item.time}</span>
            <span className="text-sm font-semibold text-gray-900">{item.task}</span>
          </div>
          <Badge variant={item.status === 'Completed' ? 'success' : item.status === 'In Progress' ? 'warning' : 'default'}>{item.status}</Badge>
        </div>
      ))}
    </GlassCard>
  </DashboardLayout>
);

export const AIProgressPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Track Event Progress</h1>
    <p className="text-gray-500 mb-6">Real-time progress monitoring for your upcoming events.</p>

    <div className="space-y-4">
      {events.map((event) => (
        <GlassCard key={event.id} className="p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
            <Badge variant="success">{event.progress || 65}% Completed</Badge>
          </div>
          <ProgressBar value={event.progress || 65} color="bg-primary-500" />
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

// ============================================================
// Enhanced AI Budget Estimator
// ============================================================
export const AIBudgetPage: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState(2500000);
  const [venueAlloc, setVenueAlloc] = useState(35);
  const [cateringAlloc, setCateringAlloc] = useState(30);
  const [decorAlloc, setDecorAlloc] = useState(20);
  const [photoAlloc, setPhotoAlloc] = useState(15);

  const venueAmount = Math.round((totalBudget * venueAlloc) / 100);
  const cateringAmount = Math.round((totalBudget * cateringAlloc) / 100);
  const decorAmount = Math.round((totalBudget * decorAlloc) / 100);
  const photoAmount = Math.round((totalBudget * photoAlloc) / 100);

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">AI Smart Budget Estimator</h1>
      <p className="text-gray-500 mb-6">Interactive budget calculator with category allocation & AI savings suggestions.</p>

      <GlassCard className="p-6 max-w-4xl space-y-6">
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Total Event Budget (₹)</label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="input-field text-xl font-bold text-primary-600"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-gray-900">Adjust Category Allocation (%)</h4>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Venue & Stage: {venueAlloc}%</span>
                <span>{formatCurrency(venueAmount)}</span>
              </div>
              <input type="range" min="10" max="60" value={venueAlloc} onChange={(e) => setVenueAlloc(Number(e.target.value))} className="w-full accent-primary-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Catering & Drinks: {cateringAlloc}%</span>
                <span>{formatCurrency(cateringAmount)}</span>
              </div>
              <input type="range" min="10" max="60" value={cateringAlloc} onChange={(e) => setCateringAlloc(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Decoration & Flowers: {decorAlloc}%</span>
                <span>{formatCurrency(decorAmount)}</span>
              </div>
              <input type="range" min="5" max="40" value={decorAlloc} onChange={(e) => setDecorAlloc(Number(e.target.value))} className="w-full accent-purple-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Photography & Video: {photoAlloc}%</span>
                <span>{formatCurrency(photoAmount)}</span>
              </div>
              <input type="range" min="5" max="30" value={photoAlloc} onChange={(e) => setPhotoAlloc(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-2">AI Cost-Saving Tips</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">💡 <span>Booking venue on a Friday instead of Saturday saves approx <strong>₹1,50,000</strong>.</span></li>
                <li className="flex items-start gap-2">💡 <span>Opting for seasonal local flowers reduces decoration costs by <strong>18%</strong>.</span></li>
                <li className="flex items-start gap-2">💡 <span>Bundling DJ & Sound with Stage Lighting yields a <strong>10% package discount</strong>.</span></li>
              </ul>
            </div>
            <button onClick={() => alert('Budget breakdown saved to your event profile!')} className="btn-primary w-full text-xs py-2.5">
              Save AI Budget Allocation
            </button>
          </div>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};

// ============================================================
// Enhanced AI Planning Assistant Chatbot
// ============================================================
export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: 'Hello Aditya! I am your EventCrafts AI Planning Assistant. How can I help you organize your upcoming event today?' },
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    'Suggest 5 unique wedding entrance ideas',
    'How to manage 300 guests on ₹15 Lakhs budget?',
    'What are top trending wedding color themes for 2026?',
    'Vendor contract checklist items',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let aiResponse = "I've analyzed your request! ";
      if (query.toLowerCase().includes('entrance')) {
        aiResponse += "Here are 3 grand entrance ideas:\n1. Royal Cold Pyros with Dhol Tasha Procession\n2. Floral Canopy Tunnel with Smoke Effects\n3. Vintage Open Car Arrival with Live Violinists.";
      } else if (query.toLowerCase().includes('budget')) {
        aiResponse += "For ₹15 Lakhs & 300 guests, allocate:\n- Venue & Food: ₹9.5 Lakhs (₹1,500/plate)\n- Decor: ₹3 Lakhs\n- Photo/Video: ₹1.5 Lakhs\n- Buffer: ₹1 Lakh.";
      } else {
        aiResponse += "I have updated your event recommendations. Would you like me to add this to your event task checklist?";
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 800);
  };

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">AI Event Planning Assistant</h1>
      <p className="text-xs text-gray-500 mb-6">Ask anything about vendor negotiations, event timelines, guest management, or themes.</p>

      <GlassCard className="h-[550px] flex flex-col justify-between p-4">
        <div className="space-y-3 overflow-y-auto custom-scrollbar p-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-3 rounded-2xl max-w-lg text-sm leading-relaxed whitespace-pre-line ${m.sender === 'user' ? 'bg-primary-500 text-white font-medium' : 'bg-gray-100 text-gray-800'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div>
          {/* Suggestion Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2 custom-scrollbar">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSendMessage(s)}
                className="px-3 py-1 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-medium rounded-full whitespace-nowrap transition-colors"
              >
                ✨ {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-t border-gray-100 pt-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI anything..."
              className="input-field"
            />
            <button onClick={() => handleSendMessage()} className="btn-primary !px-5">
              <Send size={16} />
            </button>
          </div>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};

// ============================================================
// Guest Management Page (With Add/Edit/Delete Guest CRUD)
// ============================================================
export const GuestManagementPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRsvp, setFilterRsvp] = useState('all');
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');

  const filteredGuests = guests.filter((g) => {
    if (filterRsvp === 'all') return true;
    return g.rsvpStatus === filterRsvp;
  });

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;
    const g: Guest = {
      id: `g${guests.length + 1}`,
      name: newGuestName,
      email: newGuestEmail || 'guest@example.com',
      phone: '+91 98765 00000',
      rsvpStatus: 'invited',
      plusOne: false,
    };
    setGuests([...guests, g]);
    setNewGuestName('');
    setNewGuestEmail('');
    setShowAddModal(false);
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const handleExportCSV = () => {
    alert('Guest list exported to guest_list.csv!');
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Guest Management</h1>
          <p className="text-xs text-gray-500">Track invitations, RSVPs, dietary needs, and seating tags.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportCSV} className="btn-secondary text-sm"><Download size={16} />Export CSV</button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm"><Plus size={16} />Add Guest</button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {['all', 'accepted', 'declined', 'invited'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterRsvp(status)}
            className={cn(
              'px-3.5 py-1.5 text-xs font-bold capitalize rounded-xl transition-all',
              filterRsvp === status ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            )}
          >
            {status} ({status === 'all' ? guests.length : guests.filter(g => g.rsvpStatus === status).length})
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Guest Name</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">RSVP Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Plus One</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredGuests.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{g.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{g.email}</td>
                  <td className="px-5 py-3.5"><Badge variant={g.rsvpStatus === 'accepted' ? 'success' : g.rsvpStatus === 'declined' ? 'danger' : 'warning'}>{g.rsvpStatus}</Badge></td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{g.plusOne ? 'Yes' : 'No'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => handleDeleteGuest(g.id)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Guest" size="md">
        <form onSubmit={handleAddGuest} className="space-y-4">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Guest Full Name</label><input type="text" value={newGuestName} onChange={(e) => setNewGuestName(e.target.value)} className="input-field" placeholder="Full Name" required /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Guest Email</label><input type="email" value={newGuestEmail} onChange={(e) => setNewGuestEmail(e.target.value)} className="input-field" placeholder="guest@example.com" /></div>
          <button type="submit" className="btn-primary w-full">Save Guest</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

// ============================================================
// Other Functional Customer Pages
// ============================================================
export const InvitationsPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Digital Invitations & RSVP</h1>
      <p className="text-gray-500 mb-6">Select digital invitation templates and send to guests instantly via WhatsApp or Email.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {invitationTemplates.map((template) => (
          <GlassCard key={template.id} hover className="p-4 text-center cursor-pointer" onClick={() => setSelectedTemplate(template)}>
            <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl mb-3 flex items-center justify-center text-primary-500 font-bold">
              <MailIcon size={36} />
            </div>
            <p className="text-sm font-semibold text-gray-900">{template.name}</p>
            <button className="btn-primary w-full mt-2 text-xs !py-1.5">Customize & Send</button>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={!!selectedTemplate} onClose={() => setSelectedTemplate(null)} title={`Invitation: ${selectedTemplate?.name}`} size="md">
        <div className="space-y-4">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Event Title on Card</label><input type="text" defaultValue="Aditya & Ananya's Royal Wedding" className="input-field" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Venue & Timing</label><input type="text" defaultValue="Royal Grand Palace, Nov 24, 6:00 PM" className="input-field" /></div>
          <button onClick={() => { alert('Digital Invitation link generated & sent!'); setSelectedTemplate(null); }} className="btn-primary w-full">Send Invitation Link</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export const RSVPPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">RSVP Analytics & Breakdown</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">Guest Responses</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-xl text-center"><p className="text-3xl font-bold text-emerald-600">82</p><p className="text-xs text-gray-500 font-semibold mt-1">Accepted RSVPs</p></div>
        <div className="p-4 bg-red-50 rounded-xl text-center"><p className="text-3xl font-bold text-red-600">12</p><p className="text-xs text-gray-500 font-semibold mt-1">Declined</p></div>
        <div className="p-4 bg-amber-50 rounded-xl text-center"><p className="text-3xl font-bold text-amber-600">26</p><p className="text-xs text-gray-500 font-semibold mt-1">Awaiting Response</p></div>
      </div>
    </GlassCard>
  </DashboardLayout>
);

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'vendor', text: 'Hi Aditya! I would like to confirm the wedding venue stage layout details.' },
    { sender: 'user', text: 'Sure! We prefer the Royal Maharaja Gold Mandap theme.' },
  ]);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setText('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'vendor', text: 'Got it! I will update the stage layout sheet.' }]);
    }, 1000);
  };

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Live Chat with Vendors & Planners</h1>
      <GlassCard className="h-[500px] flex flex-col justify-between p-4">
        <div className="space-y-3 overflow-y-auto custom-scrollbar p-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2.5 rounded-2xl max-w-sm text-sm ${m.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your message..." className="input-field" />
          <button onClick={handleSend} className="btn-primary !px-5"><Send size={16} /></button>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};

export const PaymentsPage: React.FC = () => {
  const [showPayModal, setShowPayModal] = useState(false);

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Payments & Escrow Management</h1>
        <button onClick={() => setShowPayModal(true)} className="btn-primary text-sm"><CreditCard size={16} />Make Deposit Payment</button>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Transaction</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{t.description}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{formatCurrency(t.amount)}</td>
                  <td className="px-5 py-3.5"><Badge variant={t.status === 'completed' ? 'success' : 'warning'}>{t.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Make Vendor Deposit" size="md">
        <div className="space-y-4">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Vendor Name</label><input type="text" defaultValue="Royal Grand Decorators" className="input-field" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Amount (₹)</label><input type="number" defaultValue={50000} className="input-field" /></div>
          <button onClick={() => { alert('Payment of ₹50,000 processed cleanly!'); setShowPayModal(false); }} className="btn-primary w-full">Confirm & Pay</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export const NotificationsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Notifications & Reminders</h1>
    <div className="space-y-3">
      {notifications.map((n) => (
        <GlassCard key={n.id} className="p-4 flex justify-between items-center">
          <div><p className="font-semibold text-sm text-gray-900">{n.title}</p><p className="text-xs text-gray-500">{n.message}</p></div>
          <Badge variant={n.type === 'success' ? 'success' : 'info'}>{n.type}</Badge>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

export const ReviewsPage: React.FC = () => {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ vendor: 'Royal Grand Decorators', rating: 5, comment: '' });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment) return;
    setReviewsList([
      ...reviewsList,
      {
        id: `r${reviewsList.length + 1}`,
        userId: 'u1',
        userName: 'Aditya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        targetId: 'v1',
        rating: newReview.rating,
        comment: newReview.comment,
        date: '2026-08-02',
        eventType: 'Wedding',
      },
    ]);
    setShowModal(false);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm"><Star size={16} />Write a Review</button>
      </div>

      <div className="space-y-4">
        {reviewsList.map((r) => (
          <GlassCard key={r.id} className="p-5">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-900">{r.userName}</h4>
              <StarRating rating={r.rating} size={14} />
            </div>
            <p className="text-sm text-gray-600 mt-2">{r.comment}</p>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Write Vendor Review" size="md">
        <form onSubmit={handleAddReview} className="space-y-4">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Vendor Name</label><input type="text" value={newReview.vendor} onChange={(e) => setNewReview({...newReview, vendor: e.target.value})} className="input-field" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Rating (1 to 5)</label><input type="number" min="1" max="5" value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})} className="input-field" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Your Review Comment</label><textarea value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} className="input-field h-24" placeholder="Tell us about your experience..." required /></div>
          <button type="submit" className="btn-primary w-full">Publish Review</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export const ProfilePage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Customer Profile</h1>
    <GlassCard className="p-6 max-w-md">
      <Avatar name="Aditya Sharma" size="xl" className="mx-auto mb-4" />
      <h3 className="font-bold text-lg text-center text-gray-900">Aditya Sharma</h3>
      <p className="text-xs text-center text-gray-500 mb-6">aditya.sharma@email.com</p>

      <div className="space-y-4">
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label><input type="text" defaultValue="Aditya Sharma" className="input-field" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label><input type="text" defaultValue="+91 98765 43210" className="input-field" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">City / Region</label><input type="text" defaultValue="Mumbai, India" className="input-field" /></div>
        <button onClick={() => alert('Profile updated successfully!')} className="btn-primary w-full mt-2">Save Profile Changes</button>
      </div>
    </GlassCard>
  </DashboardLayout>
);

