import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarPlus, ArrowRight, ArrowLeft, MapPin, Users, Clock, IndianRupee,
  Heart, Briefcase, Cake, GraduationCap, Gift, Sparkles, Rocket,
  CheckCircle2, Info, UserCheck, Check, Star, Bot, Send, MessageSquare,
  Wand2, Utensils, Palette, RefreshCw, CheckSquare
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { GlassCard, Avatar, Badge, Modal } from '@/components/ui';
import { customerSidebarSections } from '@/pages/customer/CustomerPages';
import { eventPlanners } from '@/data';
import { cn, formatCurrency } from '@/lib/utils';

const eventTypes = [
  { name: 'Wedding', icon: <Heart size={24} />, color: 'from-pink-500 to-rose-500' },
  { name: 'Corporate Conference', icon: <Briefcase size={24} />, color: 'from-blue-500 to-indigo-500' },
  { name: 'Birthday Party', icon: <Cake size={24} />, color: 'from-amber-400 to-orange-500' },
  { name: 'Graduation', icon: <GraduationCap size={24} />, color: 'from-emerald-500 to-green-600' },
  { name: 'Baby Shower', icon: <Gift size={24} />, color: 'from-purple-400 to-pink-400' },
  { name: 'Anniversary', icon: <Gift size={24} />, color: 'from-amber-500 to-amber-600' },
  { name: 'Charity Gala', icon: <Sparkles size={24} />, color: 'from-teal-500 to-cyan-500' },
  { name: 'Product Launch', icon: <Rocket size={24} />, color: 'from-violet-500 to-purple-600' },
];

const cuisineOptions = [
  {
    id: 'Indian',
    name: 'North & South Indian',
    desc: 'Rich thalis, royal biryani, tandoori starters & live chaat counters.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop',
    tag: 'Popular Choice',
  },
  {
    id: 'Continental',
    name: 'Continental & European',
    desc: 'Artisanal breads, live pasta station, roasts & creamy soups.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop',
    tag: 'Gourmet',
  },
  {
    id: 'Chinese',
    name: 'Asian & Pan-Chinese',
    desc: 'Dim sums, Hakka noodles, live wok counters & sushi rolls.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop',
    tag: 'Trending',
  },
  {
    id: 'Italian',
    name: 'Italian & Mediterranean',
    desc: 'Woodfired pizzas, lasagna, fresh antipasti & creamy risotto.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop',
    tag: 'Live Counter',
  },
  {
    id: 'Mexican',
    name: 'Mexican Fiesta',
    desc: 'Taco bars, sizzling fajitas, churros & live nacho fountain.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop',
    tag: 'Festive',
  },
  {
    id: 'Jain',
    name: 'Jain & Pure Veg Gourmet',
    desc: '100% pure sattvic delicacies prepared without onion or garlic.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop',
    tag: 'Sattvic',
  },
];

const themeOptions = [
  {
    id: 'Royal',
    name: 'Royal Palace & Luxury',
    desc: 'Gold drapes, crystal chandeliers, grand floral mandap & velvet accents.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop',
    colors: ['#D4AF37', '#800020', '#FFFFFF'],
  },
  {
    id: 'Modern',
    name: 'Modern Minimalist',
    desc: 'Geometric glass structures, sleek monochrome tones & ambient LED lights.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&auto=format&fit=crop',
    colors: ['#1E293B', '#6366F1', '#F8FAFC'],
  },
  {
    id: 'Bohemian',
    name: 'Bohemian & Pampas Floral',
    desc: 'Fairy light canopies, pampas grass, macrame decor & warm earthy woods.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop',
    colors: ['#D97706', '#92400E', '#FEF3C7'],
  },
  {
    id: 'Rustic',
    name: 'Rustic Outdoor Garden',
    desc: 'Lush greenery, hanging ivy, wooden benches & botanical flower blooms.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop',
    colors: ['#059669', '#78350F', '#ECFDF5'],
  },
  {
    id: 'Vintage',
    name: 'Vintage Retro & Glam',
    desc: 'Edison filament bulbs, velvet lounges & antique brass highlights.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop',
    colors: ['#7C3AED', '#F59E0B', '#111827'],
  },
  {
    id: 'Tropical',
    name: 'Tropical Sunset Beach',
    desc: 'Palm fronds, vibrant floral arches, sunset ombre & coconut bars.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop',
    colors: ['#EC4899', '#3B82F6', '#FDE047'],
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  recommendedCuisines?: string[];
  recommendedThemes?: string[];
  timestamp: string;
}

// ============================================================
// Create Event (Multi-Step Form) with Gemini AI Chatbot
// ============================================================
const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('Wedding');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('2026-10-15');
  const [eventTime, setEventTime] = useState('18:00');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('2500000');
  const [guestCount, setGuestCount] = useState('500');
  const [planningMode, setPlanningMode] = useState<'self' | 'planner'>('self');
  const [selectedPlannerId, setSelectedPlannerId] = useState<string>('ep1');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['Indian', 'Continental']);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['Royal']);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Gemini AI Chatbot State
  const [geminiMessages, setGeminiMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'gemini',
      text: `Hello! I'm Gemini AI, your Smart Event Assistant. Tell me your guest count, budget, or preferred vibes, and I will recommend the perfect Food Menu & Decor Theme pairing for your ${selectedType}!`,
      recommendedCuisines: ['Indian', 'Continental'],
      recommendedThemes: ['Royal'],
      timestamp: 'Just now',
    },
  ]);
  const [geminiInput, setGeminiInput] = useState('');
  const [isGeminiThinking, setIsGeminiThinking] = useState(false);

  const totalSteps = 4;
  const activePlanner = eventPlanners.find((p) => p.id === selectedPlannerId) || eventPlanners[0];

  const toggleCuisine = (id: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleTheme = (id: string) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const applyGeminiRecommendation = (cuisines?: string[], themes?: string[]) => {
    if (cuisines && cuisines.length > 0) {
      setSelectedCuisines(cuisines);
    }
    if (themes && themes.length > 0) {
      setSelectedThemes(themes);
    }
  };

  const handleSendGeminiQuery = (queryText?: string) => {
    const textToSend = queryText || geminiInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setGeminiMessages((prev) => [...prev, userMsg]);
    if (!queryText) setGeminiInput('');
    setIsGeminiThinking(true);

    setTimeout(() => {
      let replyText = '';
      let recCuisines: string[] = ['Indian', 'Continental'];
      let recThemes: string[] = ['Royal'];

      const lower = textToSend.toLowerCase();
      if (lower.includes('jain') || lower.includes('veg')) {
        replyText = `Based on your request for pure vegetarian & sattvic hospitality, I recommend pairing Jain & Pure Veg Gourmet thalis with live North Indian chaat counters and an Eco-Friendly Rustic Garden theme!`;
        recCuisines = ['Jain', 'Indian'];
        recThemes = ['Rustic', 'Modern'];
      } else if (lower.includes('beach') || lower.includes('tropical') || lower.includes('sunset')) {
        replyText = `For a breezy coastal or sunset reception, I recommend Mexican Fiesta taco bars & Italian live counters paired with a vibrant Tropical Sunset Beach decor!`;
        recCuisines = ['Mexican', 'Italian'];
        recThemes = ['Tropical', 'Bohemian'];
      } else if (lower.includes('royal') || lower.includes('grand') || lower.includes('wedding')) {
        replyText = `For a grand celebration for ${guestCount} guests, a Royal Palace theme with crimson velvet & gold drapes paired with rich North Indian Thalis & European Continental live stations will create an unforgettable imperial experience!`;
        recCuisines = ['Indian', 'Continental'];
        recThemes = ['Royal', 'Vintage'];
      } else if (lower.includes('modern') || lower.includes('minimal')) {
        replyText = `A Modern Minimalist theme with geometric LED structures paired with Pan-Asian & Italian woodfired counters provides a sleek, contemporary atmosphere!`;
        recCuisines = ['Chinese', 'Italian'];
        recThemes = ['Modern', 'Minimalist'];
      } else {
        replyText = `Analyzing your event profile (${guestCount} guests, ₹${Number(budget).toLocaleString('en-IN')} budget)... I recommend combining North Indian Royal Feast & Italian Live Stations with a Royal Luxury decor!`;
        recCuisines = ['Indian', 'Italian'];
        recThemes = ['Royal', 'Modern'];
      }

      const botMsg: ChatMessage = {
        id: `g-${Date.now()}`,
        sender: 'gemini',
        text: replyText,
        recommendedCuisines: recCuisines,
        recommendedThemes: recThemes,
        timestamp: 'Just now',
      };

      setGeminiMessages((prev) => [...prev, botMsg]);
      setIsGeminiThinking(false);
    }, 900);
  };

  const handleFinishCreate = () => {
    setShowSuccessModal(true);
  };

  return (
    <DashboardLayout sidebarSections={customerSidebarSections} roleLabel="Customer" roleColor="text-primary-500">
      <div className="max-w-4xl mx-auto">
        {/* Header & Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-xs text-gray-500 mt-0.5">Customize budget, guest count, food menu & decor themes with Gemini AI.</p>
            </div>
            <span className="text-xs font-bold px-3.5 py-1 bg-primary-100 text-primary-700 rounded-full">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-2 flex-1 rounded-full transition-all duration-500',
                  i < step ? 'bg-gradient-to-r from-primary-500 to-primary-600' : 'bg-gray-200'
                )}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Event Type */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 mb-1">What type of event are you planning?</h2>
            <p className="text-xs text-gray-500 mb-6">Choose a category to get tailored AI recommendations.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventTypes.map((type) => {
                const isSelected = selectedType === type.name;
                return (
                  <button
                    key={type.name}
                    onClick={() => setSelectedType(type.name)}
                    className={cn(
                      'p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer relative',
                      isSelected
                        ? 'border-primary-500 bg-primary-50/70 shadow-md shadow-primary-500/10 scale-[1.02]'
                        : 'border-gray-200/80 bg-white hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    {isSelected && (
                      <CheckCircle2 size={16} className="absolute top-3 right-3 text-primary-500" />
                    )}
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-3 shadow-sm`}>
                      {type.icon}
                    </div>
                    <p className="text-xs font-bold text-gray-900">{type.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Event Details</h2>
            <p className="text-xs text-gray-500 mb-6">Tell us more about your {selectedType || 'event'}.</p>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Event Title</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="input-field"
                placeholder={`e.g., Sharma-Gupta Royal ${selectedType}`}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Event Date</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Event Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Location / City</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field pl-10"
                  placeholder="e.g., Royal Grand Palace, Mumbai, Maharashtra"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Vision & Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field min-h-[90px] resize-none"
                placeholder="Describe your event theme or special preferences..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Budget, Guest Count & Planning Mode */}
        {step === 3 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Budget, Guest Scale & Planning Mode</h2>
              <p className="text-xs text-gray-500">Configure your scale and select whether to self-plan or hire an event planner.</p>
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Estimated Budget (₹)</label>
              <div className="relative">
                <IndianRupee size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="input-field pl-10 font-bold text-primary-600 text-base"
                  placeholder="25,00,000"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[
                  { label: '₹1L', val: '100000' },
                  { label: '₹5L', val: '500000' },
                  { label: '₹10L', val: '1000000' },
                  { label: '₹25L', val: '2500000' },
                  { label: '₹50L+', val: '5000000' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setBudget(preset.val)}
                    className={cn(
                      'px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer',
                      budget === preset.val
                        ? 'bg-primary-500 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Expected Guest Count</label>
              <div className="relative">
                <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="input-field pl-10"
                  placeholder="500"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {['50', '100', '250', '500', '1000'].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setGuestCount(cnt)}
                    className={cn(
                      'px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer',
                      guestCount === cnt
                        ? 'bg-primary-500 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {cnt} guests
                  </button>
                ))}
              </div>
            </div>

            {/* Planning Mode Option Toggle */}
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 block">
                Select Planning Mode
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Option 1: Self Planning */}
                <button
                  type="button"
                  onClick={() => setPlanningMode('self')}
                  className={cn(
                    'p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative',
                    planningMode === 'self'
                      ? 'border-primary-500 bg-primary-50/70 shadow-md shadow-primary-500/10'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2
                      size={18}
                      className={planningMode === 'self' ? 'text-primary-600' : 'text-gray-400'}
                    />
                    <span className={cn('font-bold text-sm', planningMode === 'self' ? 'text-primary-800' : 'text-gray-700')}>
                      Self Planning Mode
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed pl-6">
                    Browse and book vendors yourself using AI tools & budget allocators.
                  </p>
                </button>

                {/* Option 2: Hire Event Planner */}
                <button
                  type="button"
                  onClick={() => setPlanningMode('planner')}
                  className={cn(
                    'p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative',
                    planningMode === 'planner'
                      ? 'border-primary-500 bg-primary-50/70 shadow-md shadow-primary-500/10 ring-2 ring-primary-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck
                      size={18}
                      className={planningMode === 'planner' ? 'text-primary-600' : 'text-gray-400'}
                    />
                    <span className={cn('font-bold text-sm', planningMode === 'planner' ? 'text-primary-800' : 'text-gray-700')}>
                      Hire Event Planner
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed pl-6">
                    Assign a certified event planner to manage vendors, schedules & decor for you.
                  </p>
                </button>
              </div>
            </div>

            {/* Interactive Event Planner Selection Drawer when Hire Planner is chosen */}
            {planningMode === 'planner' && (
              <div className="p-5 bg-gradient-to-br from-primary-50/80 to-purple-50/50 border border-primary-200/80 rounded-2xl space-y-4 animate-scale-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                      <UserCheck size={16} className="text-primary-600" />
                      Assigned Event Planner Selection
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Select your preferred planner to manage this {selectedType || 'event'}.
                    </p>
                  </div>
                  <Link to="/customer/hire-planner" className="text-xs font-bold text-primary-600 hover:underline">
                    View All ({eventPlanners.length})
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {eventPlanners.map((planner) => {
                    const isSelected = selectedPlannerId === planner.id;
                    return (
                      <div
                        key={planner.id}
                        onClick={() => setSelectedPlannerId(planner.id)}
                        className={cn(
                          'p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 bg-white',
                          isSelected
                            ? 'border-primary-500 shadow-md shadow-primary-500/15 ring-2 ring-primary-500/20'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <Avatar name={planner.name} size="md" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{planner.name}</p>
                          <p className="text-[10px] text-primary-600 font-semibold truncate">
                            {planner.specializations.slice(0, 2).join(', ')}
                          </p>
                          <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <span>⭐ {planner.rating}</span> · <span>{planner.yearsOfExperience} Yrs Exp</span>
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Food & Theme Visual Selection + Gemini AI Chatbot */}
        {step === 4 && (
          <div className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Sparkles className="text-amber-500" size={22} />
                Food Menu & Theme Selection
              </h2>
              <p className="text-xs text-gray-500">
                Browse visual cuisine & theme moodboards, or let Gemini AI curate recommendations for you.
              </p>
            </div>

            {/* 🤖 GEMINI AI CHATBOT FOR FOOD & THEME */}
            <div className="glass-card p-5 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-pink-50/50 border border-indigo-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-100/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 text-white flex items-center justify-center shadow-sm">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                      Gemini AI Food & Theme Copilot
                      <Badge variant="gold" className="text-[10px] py-0 px-2">Powered by Gemini</Badge>
                    </h3>
                    <p className="text-[11px] text-gray-500">Ask Gemini AI to curate your ideal 5-course menu & decor palette.</p>
                  </div>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar p-1">
                {geminiMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex flex-col gap-1 text-xs',
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[88%] p-3.5 rounded-2xl leading-relaxed shadow-xs',
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : 'bg-white border border-indigo-100 text-gray-800 rounded-bl-none'
                      )}
                    >
                      <p>{msg.text}</p>

                      {/* AI Action Button: Apply Recommendation */}
                      {msg.sender === 'gemini' && (msg.recommendedCuisines || msg.recommendedThemes) && (
                        <div className="mt-3 pt-2.5 border-t border-indigo-50 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-semibold text-indigo-600">
                            Suggested: {msg.recommendedCuisines?.join(', ')} · {msg.recommendedThemes?.join(', ')}
                          </span>
                          <button
                            type="button"
                            onClick={() => applyGeminiRecommendation(msg.recommendedCuisines, msg.recommendedThemes)}
                            className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-bold rounded-lg shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
                          >
                            <Wand2 size={12} />
                            Apply AI Menu & Theme
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isGeminiThinking && (
                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold p-2 animate-pulse">
                    <Bot size={16} />
                    Gemini AI is crafting tailored recommendations...
                  </div>
                )}
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  '🍲 5-Course Royal Menu for 500 Guests',
                  '🥗 Pure Veg & Jain Fusion Counters',
                  '🎨 Royal Palace Gold & Crimson Decor Palette',
                  '🍹 Live Mocktail & Pasta Stations',
                ].map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => handleSendGeminiQuery(pill)}
                    className="px-3 py-1 text-[11px] font-medium bg-white hover:bg-indigo-50 border border-indigo-200/80 rounded-full text-indigo-700 transition-colors shadow-2xs"
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendGeminiQuery();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={geminiInput}
                  onChange={(e) => setGeminiInput(e.target.value)}
                  placeholder="Ask Gemini AI for menu ideas, dietary needs, or decor colors..."
                  className="flex-1 input-field text-xs bg-white"
                />
                <button type="submit" className="btn-primary text-xs py-2 px-4 shrink-0">
                  <Send size={14} />
                  Ask Gemini
                </button>
              </form>
            </div>

            {/* 1. VISUAL FOOD CUISINE SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Utensils size={18} className="text-primary-600" />
                  Select Food Cuisines ({selectedCuisines.length} Selected)
                </h3>
                <span className="text-[11px] text-gray-400">Click card image to select/unselect</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cuisineOptions.map((c) => {
                  const isSelected = selectedCuisines.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleCuisine(c.id)}
                      className={cn(
                        'group rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer bg-white flex flex-col justify-between',
                        isSelected
                          ? 'border-primary-500 shadow-md shadow-primary-500/15 ring-2 ring-primary-500/20'
                          : 'border-gray-200/80 hover:border-gray-300 hover:shadow-sm'
                      )}
                    >
                      <div>
                        <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                          <img
                            src={c.image}
                            alt={c.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <Badge variant="gold" className="text-[10px]">{c.tag}</Badge>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-md">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                        <div className="p-3.5">
                          <h4 className="font-bold text-xs text-gray-900 mb-1">{c.name}</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed">{c.desc}</p>
                        </div>
                      </div>
                      <div className="px-3.5 pb-3 pt-0 flex justify-between items-center text-[10px] font-bold">
                        <span className={isSelected ? 'text-primary-600' : 'text-gray-400'}>
                          {isSelected ? '✓ Selected' : '+ Click to Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. VISUAL THEME MOODBOARD SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Palette size={18} className="text-purple-600" />
                  Select Decor Themes ({selectedThemes.length} Selected)
                </h3>
                <span className="text-[11px] text-gray-400">Click moodboard image to select/unselect</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themeOptions.map((t) => {
                  const isSelected = selectedThemes.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTheme(t.id)}
                      className={cn(
                        'group rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer bg-white flex flex-col justify-between',
                        isSelected
                          ? 'border-purple-600 shadow-md shadow-purple-500/15 ring-2 ring-purple-500/20'
                          : 'border-gray-200/80 hover:border-gray-300 hover:shadow-sm'
                      )}
                    >
                      <div>
                        <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute bottom-2.5 left-2.5 flex gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                            {t.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-3 h-3 rounded-full border border-white/40 shadow-xs"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                        <div className="p-3.5">
                          <h4 className="font-bold text-xs text-gray-900 mb-1">{t.name}</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed">{t.desc}</p>
                        </div>
                      </div>
                      <div className="px-3.5 pb-3 pt-0 flex justify-between items-center text-[10px] font-bold">
                        <span className={isSelected ? 'text-purple-600' : 'text-gray-400'}>
                          {isSelected ? '✓ Theme Applied' : '+ Apply Theme'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-gray-700">
              <p className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <span>📋</span> Complete Event Summary
              </p>
              <div className="grid sm:grid-cols-2 gap-3 leading-relaxed">
                <p><strong>Event Type:</strong> {selectedType}</p>
                <p><strong>Title:</strong> {eventName || `${selectedType} Celebration`}</p>
                <p><strong>Date & Time:</strong> {eventDate} at {eventTime}</p>
                <p><strong>Location:</strong> {location || 'Mumbai, Maharashtra'}</p>
                <p><strong>Budget:</strong> {formatCurrency(Number(budget) || 2500000)}</p>
                <p><strong>Guest Count:</strong> {guestCount} guests</p>
                <p><strong>Selected Cuisines:</strong> {selectedCuisines.join(', ') || 'None'}</p>
                <p><strong>Selected Themes:</strong> {selectedThemes.join(', ') || 'None'}</p>
                <p className="col-span-full pt-1 border-t border-slate-200/60">
                  <strong>Planning Mode:</strong>{' '}
                  {planningMode === 'planner'
                    ? `Hired Event Planner (${activePlanner.name})`
                    : 'Self Planning with Gemini AI Assistance'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="btn-ghost text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} className="btn-primary text-xs">
              Next Step
              <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleFinishCreate} className="btn-primary text-xs px-6 py-3">
              <Sparkles size={16} />
              Confirm & Create Event
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Event Created Successfully!" size="md">
        <div className="p-4 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {eventName || `${selectedType} Celebration`} is Ready!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {planningMode === 'planner'
                ? `Assigned to Event Planner ${activePlanner.name}. They will initiate vendor proposals & food tasting shortly.`
                : 'Your event timeline, Gemini AI budget allocator, and food menu & theme suit are active.'}
            </p>
          </div>
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/customer/events');
              }}
              className="btn-primary flex-1 text-xs"
            >
              View My Events
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default CreateEventPage;


