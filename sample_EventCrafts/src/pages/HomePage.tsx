import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Sparkles, ArrowRight, Star, CheckCircle2, Users, Calendar,
  Shield, Zap, Brain, Palette, Calculator, MapPin, MessageCircle,
  ChevronRight, Heart, Briefcase, Cake, GraduationCap, Gift, Rocket,
  Camera, UtensilsCrossed, Music, Lightbulb, Truck, Phone, Mail,
  Facebook, Twitter, Instagram, Linkedin, Youtube, Award, Clock,
  TrendingUp, BadgeCheck, Play, ChevronDown,
} from 'lucide-react';
import { StarRating, AccordionItem, Avatar, GlassCard } from '@/components/ui';
import {
  vendors, eventPlanners, eventCategories, faqs, testimonials,
} from '@/data';

// ============================================================
// Public Homepage
// ============================================================

const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Wedding': <Heart size={24} />,
    'Corporate Conference': <Briefcase size={24} />,
    'Birthday Party': <Cake size={24} />,
    'Graduation': <GraduationCap size={24} />,
    'Baby Shower': <Gift size={24} />,
    'Anniversary': <Gift size={24} />,
    'Charity Gala': <Sparkles size={24} />,
    'Product Launch': <Rocket size={24} />,
  };

  const vendorCategoryIcons: Record<string, React.ReactNode> = {
    'Venue': <MapPin size={20} />,
    'Catering': <UtensilsCrossed size={20} />,
    'Photography': <Camera size={20} />,
    'DJ & Sound': <Music size={20} />,
    'Lighting': <Lightbulb size={20} />,
    'Transportation': <Truck size={20} />,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════
          Navigation Bar
          ═══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-glass">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                Event<span className="text-primary-500">Crafts</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">Features</a>
              <a href="#categories" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">Categories</a>
              <a href="#vendors" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">Vendors</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">Testimonials</a>
              <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">FAQ</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/login" className="btn-ghost text-sm">Log In</Link>
              <Link to="/register" className="btn-secondary text-sm !py-2.5">Register</Link>
              <Link to="/customer/create-event" className="btn-primary text-sm !py-2.5">
                <Sparkles size={16} />
                Create Event
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              <a href="#features" className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#categories" className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Categories</a>
              <a href="#vendors" className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Vendors</a>
              <a href="#how-it-works" className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#testimonials" className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <hr className="border-gray-100" />
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="btn-secondary w-full text-center">Log In</Link>
                <Link to="/register" className="btn-primary w-full text-center">
                  <Sparkles size={16} />
                  Create Event
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════
          Hero Section
          ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-24 lg:pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 backdrop-blur-sm rounded-full mb-6">
                <Sparkles size={16} className="text-primary-500" />
                <span className="text-sm font-semibold text-primary-700">AI-Powered Event Planning</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Craft Your{' '}
                <span className="text-gradient">Perfect</span>
                <br />
                Event Experience
              </h1>

              <p className="mt-6 text-lg lg:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0">
                Plan, manage, and execute stunning events with AI-powered automation.
                From intimate gatherings to grand celebrations — we make every moment extraordinary.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/customer/create-event" className="btn-primary text-base px-8 py-4">
                  Start Planning
                  <ArrowRight size={18} />
                </Link>
                <button className="btn-secondary text-base px-8 py-4">
                  <Play size={18} />
                  Watch Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {['Meera P', 'Arjun R', 'Sneha K', 'Ravi S', 'Pooja D'].map((name) => (
                    <Avatar key={name} name={name} size="md" className="ring-2 ring-white" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} className="fill-accent-500 text-accent-500" />
                    ))}
                    <span className="ml-1 font-semibold text-gray-900">4.9</span>
                  </div>
                  <p className="text-sm text-gray-500">Trusted by 15,000+ happy customers</p>
                </div>
              </div>
            </div>

            {/* Right – Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl blur-3xl" />

                {/* Main card */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-glass-xl p-8 border border-white/50">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>

                    {/* Event card preview */}
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                      <p className="text-sm font-medium text-primary-200">Upcoming Event</p>
                      <h3 className="text-xl font-bold mt-1">Sharma-Gupta Royal Wedding</h3>
                      <div className="flex items-center gap-4 mt-3 text-sm text-primary-200">
                        <span className="flex items-center gap-1"><Calendar size={14} /> Sep 15, 2026</span>
                        <span className="flex items-center gap-1"><Users size={14} /> 500 guests</span>
                      </div>
                      <div className="mt-4 bg-white/20 rounded-xl p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Planning Progress</span>
                          <span className="font-bold">65%</span>
                        </div>
                        <div className="w-full h-2 bg-white/30 rounded-full">
                          <div className="h-full bg-accent-400 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                    </div>

                    {/* AI suggestion */}
                    <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                        <Brain size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">AI Suggestion</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Based on 500 guests, consider adding a photo booth corner. 94% of similar weddings include one!
                        </p>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Vendors', value: '4', icon: <Users size={14} /> },
                        { label: 'Tasks', value: '12', icon: <CheckCircle2 size={14} /> },
                        { label: 'Budget', value: '₹25L', icon: <Calculator size={14} /> },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-xl">
                          <div className="flex justify-center text-primary-500 mb-1">{stat.icon}</div>
                          <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Booking Confirmed</p>
                      <p className="text-[10px] text-gray-500">Royal Grand Palace</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                      <Star size={16} className="text-accent-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">4.9 Rating</p>
                      <p className="text-[10px] text-gray-500">15,000+ reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Stats Bar
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15,000+', label: 'Events Planned', icon: <Calendar className="text-primary-500" size={24} /> },
              { value: '2,500+', label: 'Verified Vendors', icon: <BadgeCheck className="text-emerald-500" size={24} /> },
              { value: '98%', label: 'Satisfaction Rate', icon: <TrendingUp className="text-accent-500" size={24} /> },
              { value: '₹500Cr+', label: 'Events Managed', icon: <Award className="text-blue-500" size={24} /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AI Event Planning Showcase
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
              <Brain size={16} className="text-primary-500" />
              <span className="text-sm font-semibold text-primary-700">Powered by AI</span>
            </div>
            <h2 className="section-heading">Intelligence at Every Step</h2>
            <p className="section-subheading mx-auto mt-4">
              Our AI engine analyzes thousands of data points to give you personalized recommendations,
              accurate estimates, and creative suggestions for your perfect event.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain size={28} className="text-primary-500" />,
                title: 'Smart Recommendations',
                description: 'AI matches you with the best vendors based on your event type, budget, location, and past preferences.',
                features: ['Vendor matching', 'Theme suggestions', 'Menu planning'],
              },
              {
                icon: <Calculator size={28} className="text-accent-600" />,
                title: 'Budget Intelligence',
                description: 'Get accurate cost estimates and optimize your spending with AI-powered budget analysis.',
                features: ['Cost prediction', 'Savings tips', 'Price comparison'],
              },
              {
                icon: <Palette size={28} className="text-pink-500" />,
                title: 'Visual Design Studio',
                description: 'Visualize your venue setup, decoration themes, and event layouts before committing.',
                features: ['Venue visualization', 'Theme preview', 'Décor generator'],
              },
            ].map((feature) => (
              <GlassCard key={feature.title} hover className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className="text-primary-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Features Section
          ═══════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Everything You Need</h2>
            <p className="section-subheading mx-auto mt-4">
              From planning to execution, EventCrafts provides all the tools to create unforgettable events.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar size={24} />, title: 'Event Planning', desc: 'Multi-step event creation with templates and AI guidance', color: 'bg-primary-100 text-primary-600' },
              { icon: <Users size={24} />, title: 'Vendor Marketplace', desc: 'Browse 2,500+ verified vendors across all categories', color: 'bg-blue-100 text-blue-600' },
              { icon: <Brain size={24} />, title: 'AI Assistant', desc: 'Get intelligent suggestions for every aspect of your event', color: 'bg-purple-100 text-purple-600' },
              { icon: <Shield size={24} />, title: 'Secure Payments', desc: 'Escrow-protected payments with multiple payment options', color: 'bg-emerald-100 text-emerald-600' },
              { icon: <MessageCircle size={24} />, title: 'Real-time Chat', desc: 'Communicate directly with vendors and planners', color: 'bg-pink-100 text-pink-600' },
              { icon: <MapPin size={24} />, title: 'Venue Visualization', desc: 'AI-powered 3D venue previews and layout planning', color: 'bg-amber-100 text-amber-600' },
              { icon: <Clock size={24} />, title: 'Timeline Manager', desc: 'Automated event timelines with task management', color: 'bg-teal-100 text-teal-600' },
              { icon: <Zap size={24} />, title: 'Instant Booking', desc: 'Book vendors instantly with real-time availability', color: 'bg-orange-100 text-orange-600' },
            ].map((feature) => (
              <div key={feature.title} className="glass-card-solid p-6 group hover:shadow-glass transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Event Categories
          ═══════════════════════════════════════════════════════ */}
      <section id="categories" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Event Categories</h2>
            <p className="section-subheading mx-auto mt-4">
              Whatever the occasion, we have the perfect planning tools and vendor network for you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {eventCategories.map((cat) => (
              <Link
                key={cat.name}
                to="/customer/create-event"
                className="glass-card-solid p-6 text-center group hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {categoryIcons[cat.name]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count.toLocaleString()} events</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Vendor Showcase
          ═══════════════════════════════════════════════════════ */}
      <section id="vendors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Top-Rated Vendors</h2>
            <p className="section-subheading mx-auto mt-4">
              Discover our handpicked, verified vendors trusted by thousands of event organizers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.slice(0, 6).map((vendor) => (
              <GlassCard key={vendor.id} hover className="overflow-hidden">
                {/* Vendor card image placeholder */}
                <div className={`h-40 bg-gradient-to-br from-primary-400 to-primary-600 relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/30">
                      {vendorCategoryIcons[vendor.category] || <Camera size={40} />}
                    </div>
                  </div>
                  {vendor.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold text-primary-600">
                      <BadgeCheck size={14} />
                      Verified
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700">
                    {vendor.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {vendor.location}
                  </p>
                  <StarRating rating={vendor.rating} reviewCount={vendor.reviewCount} />
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{vendor.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-primary-600">{vendor.priceRange}</span>
                    <Link to="/customer/vendors" className="text-sm font-medium text-primary-500 flex items-center gap-1 hover:underline">
                      View <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/customer/vendors" className="btn-secondary">
              Browse All Vendors
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Event Planner Showcase
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Professional Event Planners</h2>
            <p className="section-subheading mx-auto mt-4">
              Hire experienced event planners who will handle everything from start to finish.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventPlanners.map((planner) => (
              <GlassCard key={planner.id} hover className="p-6 text-center">
                <Avatar name={planner.name} size="xl" className="mx-auto mb-4" />
                <h3 className="font-bold text-gray-900">{planner.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{planner.location}</p>
                <div className="flex justify-center mt-2">
                  <StarRating rating={planner.rating} reviewCount={planner.reviewCount} size={14} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-primary-600">{planner.eventsPlanned}</p>
                    <p className="text-[10px] text-gray-500">Events</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-emerald-600">{planner.successRate}%</p>
                    <p className="text-[10px] text-gray-500">Success</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 line-clamp-2">{planner.description}</p>
                <Link to="/customer/hire-planner" className="btn-secondary w-full mt-4 text-sm !py-2">
                  View Profile
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          How EventCrafts Works
          ═══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">How EventCrafts Works</h2>
            <p className="section-subheading mx-auto mt-4">
              Four simple steps to your dream event. Our platform guides you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-accent-400" />

            {[
              { step: '01', title: 'Create Your Event', desc: 'Tell us about your event type, date, budget, and preferences.', icon: <Calendar size={24} /> },
              { step: '02', title: 'Get AI Recommendations', desc: 'Our AI suggests the best vendors, themes, and timeline for your event.', icon: <Brain size={24} /> },
              { step: '03', title: 'Book & Manage', desc: 'Book vendors, manage tasks, send invitations, and track progress.', icon: <CheckCircle2 size={24} /> },
              { step: '04', title: 'Celebrate!', desc: 'Sit back and enjoy your perfectly planned event with peace of mind.', icon: <Sparkles size={24} /> },
            ].map((step, idx) => (
              <div key={step.step} className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-glass mb-6 relative">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-gold">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Why Choose EventCrafts
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading">Why Choose EventCrafts?</h2>
              <p className="section-subheading mt-4">
                We combine cutting-edge AI technology with a premium vendor network to deliver unmatched event planning experiences.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  { title: 'AI-Powered Planning', desc: 'Smart recommendations save you time and money with data-driven insights.', icon: <Brain size={20} className="text-primary-500" /> },
                  { title: 'Verified Vendor Network', desc: 'Every vendor is background-checked and reviewed by real customers.', icon: <Shield size={20} className="text-emerald-500" /> },
                  { title: 'Transparent Pricing', desc: 'No hidden fees. See exact costs upfront with our AI budget estimator.', icon: <Calculator size={20} className="text-accent-600" /> },
                  { title: '24/7 Support', desc: 'Dedicated support team and AI chatbot available round the clock.', icon: <MessageCircle size={20} className="text-blue-500" /> },
                  { title: 'Satisfaction Guaranteed', desc: 'Escrow-protected payments released only after successful events.', icon: <Award size={20} className="text-pink-500" /> },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side comparison */}
            <div className="glass-card-solid p-8">
              <h3 className="font-bold text-gray-900 text-lg mb-6">EventCrafts vs Traditional Planning</h3>
              <div className="space-y-4">
                {[
                  { feature: 'AI Recommendations', us: true, trad: false },
                  { feature: 'Verified Vendors', us: true, trad: false },
                  { feature: 'Real-time Tracking', us: true, trad: false },
                  { feature: 'Budget Optimization', us: true, trad: false },
                  { feature: 'Venue Visualization', us: true, trad: false },
                  { feature: 'Secure Payments', us: true, trad: false },
                  { feature: 'Guest Management', us: true, trad: true },
                  { feature: 'Event Timeline', us: true, trad: true },
                ].map((row) => (
                  <div key={row.feature} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-700">{row.feature}</span>
                    <div className="flex items-center gap-8">
                      <span className={row.us ? 'text-emerald-500' : 'text-gray-300'}>
                        {row.us ? <CheckCircle2 size={18} /> : '—'}
                      </span>
                      <span className={row.trad ? 'text-emerald-500' : 'text-gray-300'}>
                        {row.trad ? <CheckCircle2 size={18} /> : '—'}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span />
                  <div className="flex items-center gap-8">
                    <span className="text-xs font-semibold text-primary-600 text-center w-5">EventCrafts</span>
                    <span className="text-xs font-semibold text-gray-400 text-center w-5">Traditional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AI Features
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-primary-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
              <Sparkles size={16} className="text-accent-400" />
              <span className="text-sm font-semibold text-accent-400">AI Features</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">AI-Powered Event Intelligence</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              Experience the future of event planning with our suite of AI tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={24} />, title: 'AI Venue Visualization', desc: 'Preview your venue setup in 3D before booking. See seating arrangements and décor placement.' },
              { icon: <Palette size={24} />, title: 'AI Theme Generator', desc: 'Get creative theme suggestions with color palettes, décor ideas, and visual mood boards.' },
              { icon: <Calculator size={24} />, title: 'AI Budget Estimator', desc: 'Accurate cost predictions based on event type, guest count, and location analysis.' },
              { icon: <Users size={24} />, title: 'AI Vendor Matching', desc: 'Smart vendor recommendations based on your preferences, ratings, and availability.' },
              { icon: <UtensilsCrossed size={24} />, title: 'AI Catering Planner', desc: 'Quantity estimation and menu suggestions based on guest count and dietary preferences.' },
              { icon: <Clock size={24} />, title: 'AI Timeline Generator', desc: 'Automated event timeline creation with vendor coordination and task scheduling.' },
            ].map((feature) => (
              <div key={feature.title} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary-500/30 flex items-center justify-center text-primary-300 mb-4 group-hover:bg-primary-500/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Testimonials
          ═══════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">What Our Customers Say</h2>
            <p className="section-subheading mx-auto mt-4">
              Real stories from real customers who created magical events with EventCrafts.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="glass-card-solid p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4">
                <StarRating rating={testimonials[currentTestimonial].rating} size={20} showValue={false} />
              </div>
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
              <Avatar name={testimonials[currentTestimonial].name} size="lg" className="mx-auto mb-3" />
              <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
              <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
              <span className="inline-block mt-2 badge-primary text-xs">{testimonials[currentTestimonial].eventType}</span>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial ? 'bg-primary-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="section-subheading mx-auto mt-4">
              Everything you need to know about EventCrafts.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === idx}
                onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Contact Section
          ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="section-heading">Get in Touch</h2>
              <p className="section-subheading mt-4">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Phone size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">+91 1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Mail size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">hello@eventcrafts.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <MapPin size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Office</p>
                    <p className="font-semibold text-gray-900">WeWork, BKC, Mumbai 400051</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card-solid p-8">
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name</label>
                    <input type="text" className="input-field" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name</label>
                    <input type="text" className="input-field" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                  <input type="email" className="input-field" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message</label>
                  <textarea className="input-field min-h-[120px] resize-none" placeholder="Tell us about your event..." />
                </div>
                <button type="button" className="btn-primary w-full">
                  Send Message
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA Banner
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Craft Your Perfect Event?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join 15,000+ happy customers who've already created unforgettable events with EventCrafts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-base">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors text-base">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Footer
          ═══════════════════════════════════════════════════════ */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-display font-bold text-lg text-white">
                  Event<span className="text-primary-400">Crafts</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                AI-powered event planning platform making every celebration extraordinary.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <div className="space-y-2.5">
                {['Browse Vendors', 'Event Planners', 'Create Event', 'AI Features', 'Pricing'].map((link) => (
                  <a key={link} href="#" className="block text-sm hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2.5">
                {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map((link) => (
                  <a key={link} href="#" className="block text-sm hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2.5">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <a key={link} href="#" className="block text-sm hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 EventCrafts. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with <Heart size={12} className="inline text-red-400 fill-red-400" /> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
