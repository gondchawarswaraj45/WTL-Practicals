import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, User, Briefcase, Package, CalendarCheck, Calendar,
  ClipboardList, CreditCard, Star, MessageCircle, Bell, Settings,
  TrendingUp, DollarSign, Clock, CheckCircle2, XCircle, Users,
  Plus, Edit, Eye, ChevronRight, ArrowUpRight, BadgeCheck,
  Camera, MapPin, Store, Check, Send, Trash2,
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { StatCard, Badge, GlassCard, StarRating, Avatar, ProgressBar, SearchInput, Modal } from '@/components/ui';
import { vendors, reviews as initialReviews, bookings as initialBookings, transactions, vendorServices as initialServices, vendorPackages as initialPackages } from '@/data';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

// ── Vendor Sidebar Config (STRICTLY VENDOR FEATURES) ─────────
export const vendorSidebarSections = [
  { title: 'Main', items: [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/vendor' },
    { label: 'Vendor Profile', icon: <User size={18} />, path: '/vendor/profile' },
  ]},
  { title: 'Services & Pricing', items: [
    { label: 'Service Management', icon: <Briefcase size={18} />, path: '/vendor/services' },
    { label: 'Package & Pricing', icon: <Package size={18} />, path: '/vendor/packages' },
  ]},
  { title: 'Bookings & Orders', items: [
    { label: 'Booking Requests', icon: <CalendarCheck size={18} />, path: '/vendor/booking-requests', badge: 3 },
    { label: 'Calendar Availability', icon: <Calendar size={18} />, path: '/vendor/calendar' },
    { label: 'Order Management', icon: <ClipboardList size={18} />, path: '/vendor/orders' },
  ]},
  { title: 'Communication & Earnings', items: [
    { label: 'Payment Tracking', icon: <CreditCard size={18} />, path: '/vendor/payments' },
    { label: 'Customer Reviews & Ratings', icon: <Star size={18} />, path: '/vendor/reviews' },
    { label: 'ChatBox', icon: <MessageCircle size={18} />, path: '/vendor/chat', badge: 2 },
  ]},
];

const SB = { sidebarSections: vendorSidebarSections, roleLabel: 'Vendor' as const, roleColor: 'text-emerald-500', userName: 'Royal Grand Palace', userRole: 'vendor' as const };

// ============================================================
// Vendor Dashboard Home
// ============================================================
export const VendorDashboard: React.FC = () => (
  <DashboardLayout {...SB}>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage services, packages, bookings, availability, and payment tracking.</p>
      </div>
      <Badge variant="success"><BadgeCheck size={12} className="mr-1" />Verified Vendor</Badge>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard label="Active Bookings" value={5} icon={<CalendarCheck size={22} className="text-primary-500" />} iconBg="bg-primary-100" />
      <StatCard label="Monthly Earnings" value={formatCurrency(850000)} icon={<DollarSign size={22} className="text-emerald-500" />} iconBg="bg-emerald-100" />
      <StatCard label="Average Rating" value="4.9" icon={<Star size={22} className="text-accent-600" />} iconBg="bg-accent-100" />
      <StatCard label="Upcoming Jobs" value={3} icon={<Clock size={22} className="text-blue-500" />} iconBg="bg-blue-100" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Pending Booking Requests</h3>
          <Link to="/vendor/booking-requests" className="text-sm text-emerald-600 font-semibold hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {[
            { customer: 'Rahul Mehra', event: 'Wedding Reception', date: 'Oct 12, 2026', amount: 500000 },
            { customer: 'Priya Kapoor', event: 'Engagement Ceremony', date: 'Sep 28, 2026', amount: 250000 },
          ].map((req, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div><p className="text-sm font-semibold text-gray-900">{req.customer}</p><p className="text-xs text-gray-500">{req.event} · {req.date}</p></div>
              <span className="text-sm font-bold text-emerald-600">{formatCurrency(req.amount)}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Vendor Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/vendor/services" className="p-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl text-xs text-center border border-emerald-200">Manage Services</Link>
          <Link to="/vendor/packages" className="p-3 bg-purple-50 text-purple-700 font-semibold rounded-xl text-xs text-center border border-purple-200">Manage Packages</Link>
          <Link to="/vendor/calendar" className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-xl text-xs text-center border border-blue-200">Set Availability</Link>
          <Link to="/vendor/payments" className="p-3 bg-amber-50 text-amber-700 font-semibold rounded-xl text-xs text-center border border-amber-200">Track Payments</Link>
        </div>
      </GlassCard>
    </div>
  </DashboardLayout>
);

// ============================================================
// Vendor Registration / Profile
// ============================================================
export const VendorProfilePage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Vendor Registration & Profile</h1>
    <GlassCard className="p-6 max-w-lg">
      <h3 className="font-bold text-gray-900 mb-4">Business Information</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert('Profile saved!'); }} className="space-y-4">
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Business Name</label><input className="input-field" defaultValue="Royal Grand Palace" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Category</label><input className="input-field" defaultValue="Venue" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Location</label><input className="input-field" defaultValue="Mumbai, Maharashtra" /></div>
        <button type="submit" className="btn-primary w-full">Update Vendor Profile</button>
      </form>
    </GlassCard>
  </DashboardLayout>
);

// ============================================================
// Service Management
// ============================================================
export const VendorServicesPage: React.FC = () => {
  const [services, setServices] = useState(initialServices);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    setServices([...services, { id: `s${services.length + 1}`, name, description: 'Vendor service', price: Number(price), duration: 'Per event', category: 'Venue' }]);
    setName(''); setPrice(''); setShowModal(false);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Service Management</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm"><Plus size={16} />Add New Service</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => (
          <GlassCard key={svc.id} className="p-5">
            <h3 className="font-bold text-gray-900">{svc.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{svc.description}</p>
            <p className="text-lg font-bold text-emerald-600 mt-3">{formatCurrency(svc.price)}</p>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Service" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <div><label className="text-xs font-semibold block mb-1">Service Name</label><input value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="e.g. VIP Catering" required /></div>
          <div><label className="text-xs font-semibold block mb-1">Price (₹)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field" placeholder="50000" required /></div>
          <button type="submit" className="btn-primary w-full">Save Service</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

// ============================================================
// Package & Pricing Management
// ============================================================
export const VendorPackagesPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Package & Pricing Management</h1>
    <div className="grid md:grid-cols-3 gap-6">
      {initialPackages.map((pkg) => (
        <GlassCard key={pkg.id} className="p-6">
          <h3 className="font-bold text-gray-900 text-lg">{pkg.name}</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{formatCurrency(pkg.price)}</p>
          <ul className="mt-4 space-y-2 text-xs text-gray-600">
            {pkg.services.map((s) => <li key={s}>✓ {s}</li>)}
          </ul>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

// ============================================================
// Booking Request Management & Calendar Availability
// ============================================================
export const VendorBookingRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: 'r1', client: 'Rahul Mehra', event: 'Wedding Reception', date: 'Oct 12, 2026', amount: 500000, status: 'Pending' },
    { id: 'r2', client: 'Priya Kapoor', event: 'Engagement Ceremony', date: 'Sep 28, 2026', amount: 250000, status: 'Pending' },
  ]);

  const handleAction = (id: string, newStatus: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Booking Request Management</h1>
      <div className="space-y-4">
        {requests.map((r) => (
          <GlassCard key={r.id} className="p-5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">{r.client}</h3>
              <p className="text-xs text-gray-500">{r.event} · {r.date} · {formatCurrency(r.amount)}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Badge variant={r.status === 'Accepted' ? 'success' : r.status === 'Declined' ? 'danger' : 'warning'}>{r.status}</Badge>
              {r.status === 'Pending' && (
                <>
                  <button onClick={() => handleAction(r.id, 'Accepted')} className="btn-primary text-xs !py-1.5 !px-3">Accept</button>
                  <button onClick={() => handleAction(r.id, 'Declined')} className="btn-ghost text-xs text-red-500">Decline</button>
                </>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export const VendorCalendarPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Calendar Availability Management</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">Select Available / Blocked Dates</h3>
      <p className="text-sm text-gray-600">Click dates to toggle between Available, Blocked, and Reserved.</p>
    </GlassCard>
  </DashboardLayout>
);

// ============================================================
// Order Management & Payment Tracking & Reviews & Chat
// ============================================================
export const VendorOrdersPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Order Management</h1>
    <GlassCard className="overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {initialBookings.map((b) => (
            <tr key={b.id}>
              <td className="px-5 py-3.5 text-sm font-medium text-gray-900">#{b.id}</td>
              <td className="px-5 py-3.5 text-sm text-gray-500">{b.service}</td>
              <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{formatCurrency(b.amount)}</td>
              <td className="px-5 py-3.5"><Badge variant={b.status === 'confirmed' ? 'success' : 'warning'}>{b.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  </DashboardLayout>
);

export const VendorPaymentsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Payment Tracking</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-2">Total Earnings: ₹42,50,000</h3>
      <p className="text-sm text-gray-500">Payouts released automatically after event completion.</p>
    </GlassCard>
  </DashboardLayout>
);

export const VendorReviewsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Customer Reviews & Ratings</h1>
    <div className="space-y-4">
      {initialReviews.map((r) => (
        <GlassCard key={r.id} className="p-5">
          <div className="flex justify-between">
            <h4 className="font-bold text-gray-900">{r.userName}</h4>
            <StarRating rating={r.rating} size={14} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{r.comment}</p>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

export const VendorChatPage: React.FC = () => {
  const [messages, setMessages] = useState(['Hello! Thank you for choosing Royal Grand Palace.', 'Let us know if you need any custom decoration additions.']);
  const [text, setText] = useState('');

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">ChatBox</h1>
      <GlassCard className="h-[450px] flex flex-col justify-between p-4">
        <div className="space-y-3 p-2 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`px-4 py-2 rounded-2xl text-sm ${i % 2 === 0 ? 'bg-gray-100 text-gray-800' : 'bg-emerald-600 text-white'}`}>{m}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-3 border-t">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="input-field" />
          <button onClick={() => { if (text) setMessages([...messages, text]); setText(''); }} className="btn-primary !px-5"><Send size={16} /></button>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};
